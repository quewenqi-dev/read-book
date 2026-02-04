// 配置你的 Supabase 密钥
const SUPABASE_URL = 'https://uarwrxxnlweigiflzozd.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhcndyeHhubHdlaWdpZmx6b3pkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMDIxNDksImV4cCI6MjA4NTY3ODE0OX0.HAQfOQQM0iLWR7R_lzvT1SOL5Ks2yhyOfWlkv4xn1mw';
// 1. 初始化，注意这里变量名改成了 myClient
const myClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2. 定义函数
async function saveData() {
    const content = document.getElementById('userInput').value;
    const age = document.getElementById('age').value;
    const statusLabel = document.getElementById('status');

    if (!content) {
        alert("请输入内容后再提交");
        return;
    }

    try {
        statusLabel.innerText = "正在发送数据...";

        // 3. 这里也同步改为 myClient
        const { data, error } = await myClient
            .from('user')
            .insert([{ name: content, age: age }]);

        if (error) {
            console.error("详细错误:", error);
            statusLabel.innerText = "错误: " + error.message;
        } else {
            statusLabel.innerText = "✅ 成功存入数据库！";
            document.getElementById('userInput').value = '';
        }
    } catch (err) {
        statusLabel.innerText = "发生错误，请检查网络";
    }
}