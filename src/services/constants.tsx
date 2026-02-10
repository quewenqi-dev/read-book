
import { Photo, Album, Person, Memory } from '../../types';
import { supabase } from '../lib/supabaseClient';

/**
 * 将 Supabase 返回的扁平数组按日期分组
 * @param {Array} list - Supabase 返回的原始数组
 */
const groupImagesByDate = (list) => {
  const groups = list.reduce((acc, item) => {
    // 1. 格式化日期 (去除具体时间，只保留 YYYY-MM-DD)
    const date = item.created_at.split('T')[0]; 
    
    // 2. 查找是否已经存在该日期的组
    let group = acc.find(g => g.date === date);
    
    if (!group) {
      // 3. 不存在则创建新组
      group = { date, images: [] };
      acc.push(group);
    }
    
    // 4. 将图片推入对应的组
    group.images.push(item);
    
    return acc;
  }, []);

  return groups;
};

export const getPhotos = async () => {
  const { data, error } = await supabase
    .storage
    .from('avatars') // 你的 Bucket 名称
    .list('', {      // 第一个参数是文件夹路径，根目录传空字符串
      limit: 100,    // 获取条数
      offset: 0,     // 分页偏移量
      sortBy: { column: 'name', order: 'asc' }, // 排序
    });

  if (error) {
    console.error('获取列表失败:', error);
    return [];
  } else {
    console.log('文件列表:', data);
    //处理data,根据created_at字段处理成2维数组，created_at是创建时间

    return groupImagesByDate(data)
  }
}

export const MOCK_PHOTOS: Photo[] = [
  { id: '1', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCHX40u88-1WuRg0xkScLptyn7FSUG1XUIRFDeAo0Da5WJ5TCEf59KC8oyeet8pZae0w-BhH85n3rgI0z3fWQbZFdLnRz-kXOZXYky1JSnzQQMzYVhVeZEf7OaY6_rHSaOsAVdM-S1LFMNkYzduVk_juBjFK_QwSVjy-UNoUlXaH2byKBovK_ABi_E7MHbz3vMkVpeFqCRTcKR8CIWIsE9YmfvRjLFmKUIP0kQdzLOG0KKnUUuVvOOEv39TQviFYTdmR-stN4hEs3A', date: 'Yesterday', location: 'New York, NY', alt: 'Street photography in NY' },
  { id: '2', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDR2vbevFVd2p06gqbcFDxIU2wvVWE_a-Wnd6pe4lO2QiSsLxzz3MMZH6qCzkEFRW0jhpeQQAd7BHM6Uau3D8Fs_K66CEkRZfgvrlRfAE_dtbkQ2a6nAKhsN5vxY3OBNBRWIxfuj0M4FdU_x4CqbXAq7Sj48gmJA-MeSwGMFHvpXBn7ccJixU5d3P5SlLHAC6_OZ1QdNlvPCerpz10d3nbRG6Y4JpZ6mh9aBAr6RT8wHS6NtzmoW9EYJFvDZwDYVGouKcqvtGU4AcY', date: 'Yesterday', location: 'New York, NY', alt: 'Coffee shop interior' },
  { id: '3', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAB-q_Uyfx49y0o0B6hL0K0-OLfy79lxkTRyO8LfJHpUIEAW0ELKTvBGJ0I-SFes0cs5bdkrGoS1J2asqdiTb3Nw9aQYX4Pvlq8-ecAqfYmLzZZfN1ZLFN_plb98IdZuAiJoHk55T3sU2spaK_4oPQpGVzFaU8xgz1U9_-jIPxfVv4em4fb7JUGhd_iQPghpbgx27ilx0LnUn_CAqKqmAarqT_DkZFgWuQc6WvrQWi2nd_JPMB8LeYaPgUIY8YQn3XCluMxeP0xCjM', date: 'Yesterday', location: 'New York, NY', alt: 'City park landscape' },
  { id: '4', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDd-uYgTNvDpdasPm55broF5Q9_2jwvzscjLXIBmoLDgZuIJvxjbYp0Bp6EC41ydZ8eNjLUqBsQPP_Thh1PV633zBsr03WmcwE_Mo6V6sZc1BbZ52O5McCC5id5bYI3TeCSQhUWp8PqbZ3uTP_m9S1FTAsM3L4ScY1XvlCGpDEnxc6TF1aHJPbai-4Ntv94n5YuTLvHLJ0yTpqNrFXfQ7SVLL_USo2fVoTt0I9w2yU6Vvbpsx4eZlBs-1DgehGAUrUPTUMQ_KPFL1s', date: 'Yesterday', location: 'New York, NY', alt: 'Urban architecture' },
  { id: '5', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjvLW3MjlCq_-eaV4eB3xZ4UCXNui2KGqDQWbLibMTEiqFLDAGNbPGKw4_XaGSMFe4wAEgUnKAO7PfQD0s6wM2ECONkbUwlGbJZHvQ1p0ygDVc6dO2pRiJx1R1v435zP8Xm5QZUhWDOpiOFGjkbMk9UJV0vrJLJ0bHmOWGI8wSvAh0y6SLiF04V7We2wr6cWrmOnGw6pA38r2VRXznHz2JNH71Z-wGfODi13eFx-CuekV7h9cs87ojI5cy6jLFMuliTTSqLdUkNFY', date: 'Yesterday', location: 'New York, NY', alt: 'Evening lights' },
  { id: '6', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCz6Vxdt5vYYUItahkPuAoRn6ag6YdE-WcB2IiRVNYzwWpTY-ayt0Kze7T3jTtjd6RfKwVlHEZVO2m8hCYWLkBlUPW7CkdAgtHkgNJxJyzB9a0XcFSLDtTmJj7W0cCSWS_oFNt_vfnXBydKJOuM4Aavd6kR_msM5opHZkBnC4_071JrUI5EVs5SMKfsZnYuVX2h5sxdrLZcqc1Zc2oLNhgq_XCaXemmSFtPWVjgXhzPu6QPwcl5teVR0hlWPKX2dlzLgGwADO0QSDk', date: 'Yesterday', location: 'New York, NY', alt: 'Tunnel' },
  { id: '7', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCVnfsq5-HbmHl3OvJeuBUyJi-eqNPkWa99ReqcX4OOAQHw9a3Ca-BBNczfk0g5HfGEA03hRT65USdGVUaiGnp8gJQ8Ary2RXQcZXaY3uOOPxpOhLF0UkgJX51X2F7y4_dwKJKieTmBExLLQirJUCkhhk1xG6cgQtw4znKpuBqZpRNcEczFLoOjxiXxCb-jZcc2CfXnm7SrEly8_ruxwmKrjLDV2DApx1eWjv9woTkcEL1YkMuCDJ0tA5LrQEMMAAe9qzYsSYj2hAE', date: 'Thursday, October 12', location: 'Brooklyn, NY', alt: 'Autumn leaves' },
  { id: '8', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCDaU0u8LAPwtUKM2UV178NCfjaTSfijQiRSzH2lyU2RUch3RlwYBSGUCQZGWt4dCE92aXkKq7QwiQBdkSbSzyOHQSW-DYaiiMQHYLlGncMB2GxcseGmb5OkoGq99_UF5r9nSl5Wt7BwGOR1qwW3eG20zT2GaPjr-ZpqCfsLChsY3ZYOdCG4W7FFdpwPJcEEDpeKkgNFFl0ger5cPUVVPcYXQi-UJ_LTKYz0lOhf2KDh3v0Z6QIYpVNcAcBNw_2-92U8bbSgBZ_gak', date: 'Thursday, October 12', location: 'Brooklyn, NY', alt: 'Gallery' },
  { id: '9', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVNVmGcBv4OEtCzw-R-V66HXOqIHaqepFtYL1revX5rYKcccN1bESRT8XkNf9LQyHCif29KzBViOKlZR_lAADjBOV8X2eq8712mK68ScYD1I0WImgujHpSD8R0dhGyu7D8hzmPv9a2R5TsiwYghmKes5zqQcfbHMwhVMyiP9pvydlXXk8ClYtfoWE8lQ4b78pjMwd9gXFNNvr5NNODJSslPtqH5RYavy8Ztuebs--eaBjyyUIqcpQjhWNec2dwqUj1Z_airTF6GjU', date: 'Thursday, October 12', location: 'Brooklyn, NY', alt: 'Laptop desk' },
];

export const MOCK_ALBUMS: Album[] = [
  { id: 'a1', title: 'Recents', count: 1248, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAIjHmv70W1vZ09f-IoJKr_X541RYjicdLekPDPcAWymbT8ZFklVXWAb-k85vRXHDRd--IDGFNkKTFC1jUi6HyOtiyLPRd9nX0EP4XR6vLRQiByw_e8AB6DdG5nHAJVjz-Y071OZFgS30xatYoIZGxJq9afUg8wl2yDvz3zW96II3fyGK6VkhPxRYhRKgJZdcaI2a008mTBYmxSliAvBQhtq9lrTlrWvnG7-Rg8FrnRM1feTui1UsY7zXz4fI9ZXyRdNAg4spPsduI' },
  { id: 'a2', title: 'Favorites', count: 452, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuEd3H-N8nYU3UFY2hRgueKnx8N84wz74qSUc_U9xCS4wMTnM1AxlFJEf04OSktlaBrU4AojaLCFgFpMwlI69elhIDjY52VcsEMoMoy-tNYyFCNb0du7cILBFCX2FeYLLabwXhKtyYDnAo1XCupjf6MpWqmbBmEOGSNJD0wHPlBMu4f1geO4iuGwW0QXLwtpLM-6RkvmyhZhZd6SK2X9quMH-DwJ91jetV7X42eX8OS7S3kIuW6EdpV0l7XHrzfUWSTPKxHrH5Opn4', isFavorite: true },
  { id: 'a3', title: 'Vacation 2023', count: 128, coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCwgDwFUqyV9MHTJsUYQ_InZpTXdiml-GHyZFQK8QT5_Hyb6ivBU0s06nx1yYYsT8cWw0k8Ui9BFBbBYyDKYHiGKE4Kr198PjOXObqjoSmkpJxPkrKHFaJ8UNb5X_XMI2JevS_2KWzeiATyMpDv-bPcrpHK7MifuLj8b3R5y-VnjUYaTGOoP6pi65k2BA_RtUoaFDoXSrAbJKjyySbW4-u-DVIammv5b9uTHmdDI1nLyqQp5sNYOooj860LZKXxIWXiKUP2RNySL1Y' },
];

export const MOCK_PEOPLE: Person[] = [
  { id: 'p1', name: 'Sarah', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDuACQfiZOHR7P-7fOc9TBXVsBW7KQJIyXWBnLAKVIPbGOYrAY2r11tW-lscZ0MPMfo7y4QroADkRCj7v0V0fE7kegf9G3yiAYLfnt4ndE5pkdmPZ-22o1Y44kMgFSEwka1zS3d4771caRrFCrOrifH2mo4m9MefC97JymYKcJTRwA7mdsQ2k7SRgujrFQsEzGLHTouY3z4i-iRAl_MCWNI8fMRGid5BI5T9UODHtT9DXGILu1DNYD9zqRjAru4RVvHTsK_TWwIy9Q' },
  { id: 'p2', name: 'David', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBbS_t8t2SzoWcZvlX9G4dFmm3Rr18jMN2TMdLCMiA8P1y4_KOoxeEYWoS9NrtYc9lRvvwUXbL9wbDdZnTEHBIscJtMqTydpYVOhi93MsCvRbMQcOpBg_IlhfqpygQXcUm8cp8Cdtk7YzRCShYGljZhdCRHW2CQLZ1uQGxRCzuGfPhb_dqwMloTpSa0AAN4I25hmd6HG1qETO64hkJsk1-W3IsaoKjrGNsD4s2tcvJ9Gn8kMjnO10p-QS81rxcKSY4tlTEQ8FGk7Ck' },
  { id: 'p3', name: 'Maya', avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDEX3HFZm6vOheL7bF3J_lrisKxWfVdrIBaICLsIbBItSozVf4iLSxA3FkxTe_aiDuptDKHkVQq2E-_k0cZpWEcziUi1NqI5fQCqVAnEZYTe2jmFEIfc62560VJML8m7hxohFQDYlM0lHx9aOXYh7cJKIX2QSyr7tIr2j6-Ywrwhsw45NsjV9fE9_8liHM1YZLISXKxRD95EPC-dWUSBPnFI7RF9qX6lMf8BMdo9ulw1etr3_M_J2z94hVmDTCpo5reHyBPA1DvUls' },
];

export const MOCK_MEMORIES: Memory[] = [
  { id: 'm1', title: 'Summer Trip', category: 'Memory', coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtt63-23ty4nNpMoTwOs6tU92rzQJMF2C0CWuKpnwlb0uUZSd82RMVZae2SIheixi4BYdS7s67hcJWFSrwDaCNieUUot9rq-DpMHya45jlMwDj8Cx0isOREPJ_99wovuBaa0SVGsW4WpVhrfQUOQYAp_LESf-TVN71NY88Q7J1aCNM-4za2PfsxTx4NTIz8YLZsFIQQFH6Hq9E41wtyOOwq9yjCzLtk7DAmZboGGLj-4X5FbmijUi-ZP6HC_CtJSoP0ARzVfWdvu4', isAiCurated: true },
  { id: 'm2', title: 'Golden Hour Peaks', category: 'A Year Ago Today', coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOB7Vndf50I7_Onh4CC1mRbTuctCJOSij3felAe3r-y9ZLxUIy0e5uknSJ3zDJDvi0B0Ofxt4gaiEJ4txhQrOPsQcbJJKYdpZnYqPeXZXBrAZorOEwiQ_On_Y07Os0-uebW3N-J0YyosL-nG1VHilmaJUCFO155mgs7PRQC-4y5gnSi8TTV30sy5poTWQA6GV4eZdovp4YUASHpkOpWcMJVrUGGvKzpOkF_kMhWmvb5jwGMxEMfD3ZlAeogJEQahC23r1cDH4OR7Q' },
  { id: 'm3', title: 'Portraits', category: 'Best of 2023', coverUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDajcN-beFQyGSTZqYDfSNlQxz2cHub4VwEdD5mTCpvEUD96zNMAWBqOUXIWa2Qo7P1b13iVX_yGKxHCU8UDbFqOJuGfBhhIs65KigEK4Qq1TOBZo0oJECuA8ukGqJ3imjumL3w325eyIn8XZdD5vG8pBYpPav2B_SUiLvuLREjsh_vaZagPzuyNmwuPzpkq3KDxLiYJeiB2iNBysvUyn0OTRl6l5XNcYDClSoynZX8fgMafSVudLUlUBJQC65Yc0qRyTj0jDOeH5A' },
];
