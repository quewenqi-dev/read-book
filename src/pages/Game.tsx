import React, { useState, useEffect, useCallback } from 'react';
import './Game.css';

interface Skill {
  name: string;
  damage: number;
  cd: number;
  currentCd: number;
  desc: string;
  unlocked: boolean;
  hits?: number;
}

interface Upgrade {
  name: string;
  effect: string;
  value: number;
  cost: number;
  desc: string;
}

interface Enemy {
  name: string;
  level: number;
  maxHp: number;
  hp: number;
  atk: number;
  exp: number;
  gold: number;
  type: EnemyType;
}

interface Location {
  name: string;
  desc: string;
  minDepth: number;
  enemyChance: number;
}

interface EnemyType {
  name: string;
  hpMod: number;
  atkMod: number;
  expMod: number;
  goldMod: number;
}

interface Item {
  name: string;
  type: string;
  effect: string;
  value?: number;
  stat?: string;
  duration?: number;
  desc: string;
}

interface InventoryItem extends Item {
  count: number;
}

const ENEMY_TYPES: EnemyType[] = [
  { name: '史莱姆', hpMod: 0.8, atkMod: 0.6, expMod: 0.8, goldMod: 0.7 },
  { name: '哥布林', hpMod: 1, atkMod: 0.9, expMod: 1, goldMod: 1 },
  { name: '骷髅兵', hpMod: 0.9, atkMod: 1.1, expMod: 1.1, goldMod: 0.9 },
  { name: '野狼', hpMod: 0.9, atkMod: 1.2, expMod: 1, goldMod: 0.8 },
  { name: '蝙蝠', hpMod: 0.6, atkMod: 0.8, expMod: 0.7, goldMod: 0.6 },
  { name: '僵尸', hpMod: 1.3, atkMod: 0.8, expMod: 1.2, goldMod: 0.8 },
  { name: '兽人', hpMod: 1.4, atkMod: 1.3, expMod: 1.5, goldMod: 1.3 },
  { name: '黑暗法师', hpMod: 0.8, atkMod: 1.5, expMod: 1.6, goldMod: 1.5 },
  { name: '石像鬼', hpMod: 1.5, atkMod: 1.2, expMod: 1.7, goldMod: 1.4 },
  { name: '恶魔', hpMod: 1.8, atkMod: 1.6, expMod: 2, goldMod: 2 },
  { name: '巨龙', hpMod: 3, atkMod: 2, expMod: 5, goldMod: 5 }
];

const LOCATIONS: Location[] = [
  { name: '起始村庄', desc: '一个宁静的小村庄，冒险从这里开始', minDepth: 0, enemyChance: 0 },
  { name: '迷雾森林', desc: '被浓雾笼罩的神秘森林，据说有野兽出没', minDepth: 1, enemyChance: 0.4 },
  { name: '黑暗洞穴', desc: '深不见底的洞穴，传来阵阵怪声', minDepth: 5, enemyChance: 0.6 },
  { name: '废弃矿坑', desc: '曾经繁华的矿坑，现在被怪物占据', minDepth: 10, enemyChance: 0.5 },
  { name: '亡灵墓地', desc: '死者不安息的地方，骷髅四处游荡', minDepth: 15, enemyChance: 0.7 },
  { name: '恶魔城堡', desc: '恶魔的巢穴，只有最强者才能生还', minDepth: 25, enemyChance: 0.8 },
  { name: '龙之巢穴', desc: '传说中的龙居住的地方', minDepth: 40, enemyChance: 0.9 }
];

const ITEMS: Item[] = [
  { name: '生命药水', type: 'consumable', effect: 'heal', value: 50, desc: '恢复50点生命值' },
  { name: '力量药水', type: 'consumable', effect: 'buff', stat: 'atk', value: 10, duration: 10, desc: '攻击力+10，持续10场战斗' },
  { name: '经验卷轴', type: 'consumable', effect: 'exp', value: 100, desc: '获得100点经验值' },
  { name: '铁剑', type: 'weapon', effect: 'atk', value: 5, desc: '攻击力+5' },
  { name: '皮甲', type: 'armor', effect: 'maxHp', value: 30, desc: '最大生命值+30' },
  { name: '戒指', type: 'accessory', effect: 'crit', value: 10, desc: '暴击率+10%' }
];

const Game: React.FC = () => {
  const [level, setLevel] = useState(1);
  const [hp, setHp] = useState(100);
  const [maxHp, setMaxHp] = useState(100);
  const [atk, setAtk] = useState(10);
  const [exp, setExp] = useState(0);
  const [maxExp, setMaxExp] = useState(100);
  const [gold, setGold] = useState(0);
  const [skillPoints, setSkillPoints] = useState(0);
  const [kills, setKills] = useState(0);
  const [depth, setDepth] = useState(0);

  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [inBattle, setInBattle] = useState(false);
  const [autoBattle, setAutoBattle] = useState(false);

  const [skills, setSkills] = useState<Skill[]>([
    { name: '火球术', damage: 2.5, cd: 3, currentCd: 0, desc: '造成250%攻击力的火焰伤害', unlocked: true },
    { name: '雷霆一击', damage: 4, cd: 5, currentCd: 0, desc: '造成400%攻击力的雷电伤害', unlocked: false },
    { name: '剑刃风暴', damage: 1.5, hits: 3, cd: 4, currentCd: 0, desc: '快速攻击3次，每次造成150%伤害', unlocked: false },
    { name: '致命一击', damage: 6, cd: 6, currentCd: 0, desc: '造成600%攻击力的暴击伤害', unlocked: false }
  ]);

  const [upgrades, setUpgrades] = useState<Upgrade[]>([
    { name: '生命强化', effect: 'maxHp', value: 20, cost: 50, desc: '最大生命值+20' },
    { name: '攻击强化', effect: 'atk', value: 3, cost: 50, desc: '攻击力+3' },
    { name: '生命恢复', effect: 'regen', value: 5, cost: 30, desc: '休息恢复+5' },
    { name: '暴击训练', effect: 'crit', value: 5, cost: 100, desc: '暴击率+5%' }
  ]);

  const [inventory, setInventory] = useState<Record<string, InventoryItem>>({});
  const [logs, setLogs] = useState<{ message: string; type: string }[]>([
    { message: '欢迎来到无尽探索的世界！点击"探索"开始你的冒险...', type: '' }
  ]);
  const [activeTab, setActiveTab] = useState('battle');

  const addLog = useCallback((message: string, type: string = '') => {
    setLogs(prev => [
      { message: `[${new Date().toLocaleTimeString()}] ${message}`, type },
      ...prev.slice(0, 49)
    ]);
  }, []);

  const currentLocation = LOCATIONS.slice().reverse().find(l => depth >= l.minDepth) || LOCATIONS[0];

  // 技能冷却计时器
  useEffect(() => {
    const interval = setInterval(() => {
      if (autoBattle && inBattle) {
        autoBattleAction();
      }
      setSkills(prev => prev.map(skill => ({
        ...skill,
        currentCd: skill.currentCd > 0 ? skill.currentCd - 1 : 0
      })));
    }, 1000);
    return () => clearInterval(interval);
  }, [autoBattle, inBattle, skills, atk]);

  const gainExp = useCallback((amount: number) => {
    setExp(prev => {
      let newExp = prev + amount;
      let newLevel = level;
      let newMaxExp = maxExp;
      let newMaxHp = maxHp;
      let newAtk = atk;
      let newSkillPoints = skillPoints;
      let newSkills = [...skills];

      while (newExp >= newMaxExp) {
        newExp -= newMaxExp;
        newLevel++;
        newMaxHp += 20;
        newMaxHp += 20;
        newAtk += 3;
        newMaxExp = Math.floor(newMaxExp * 1.2);
        newSkillPoints++;

        if (newLevel === 3 && !newSkills[1].unlocked) {
          newSkills[1] = { ...newSkills[1], unlocked: true };
          addLog('解锁新技能：雷霆一击！', 'levelup');
        }
        if (newLevel === 5 && !newSkills[2].unlocked) {
          newSkills[2] = { ...newSkills[2], unlocked: true };
          addLog('解锁新技能：剑刃风暴！', 'levelup');
        }
        if (newLevel === 8 && !newSkills[3].unlocked) {
          newSkills[3] = { ...newSkills[3], unlocked: true };
          addLog('解锁新技能：致命一击！', 'levelup');
        }
        addLog(`🎉 升级！当前等级: ${newLevel}`, 'levelup');
      }

      setLevel(newLevel);
      setMaxHp(newMaxHp);
      setHp(newMaxHp);
      setAtk(newAtk);
      setMaxExp(newMaxExp);
      setSkillPoints(newSkillPoints);
      if (newSkills.some((s, i) => s.unlocked !== skills[i].unlocked)) {
        setSkills(newSkills);
      }
      return newExp;
    });
  }, [level, maxExp, maxHp, atk, skillPoints, skills, addLog]);

  const spawnEnemy = useCallback(() => {
    const enemyType = ENEMY_TYPES[Math.min(Math.floor(depth / 5), ENEMY_TYPES.length - 1)];
    const enemyLevel = Math.max(1, depth + Math.floor(Math.random() * 3) - 1);

    const newEnemy: Enemy = {
      name: enemyType.name,
      level: enemyLevel,
      maxHp: Math.floor(50 * enemyType.hpMod * (1 + enemyLevel * 0.2)),
      hp: 0,
      atk: Math.floor(8 * enemyType.atkMod * (1 + enemyLevel * 0.15)),
      exp: Math.floor(30 * enemyType.expMod * (1 + enemyLevel * 0.1)),
      gold: Math.floor(15 * enemyType.goldMod * (1 + enemyLevel * 0.1)),
      type: enemyType
    };
    newEnemy.hp = newEnemy.maxHp;

    setEnemy(newEnemy);
    setInBattle(true);
    addLog(`遭遇 ${newEnemy.name}(Lv.${newEnemy.level})！`, 'combat');
  }, [depth, addLog]);

  const enemyAttack = useCallback(() => {
    if (!enemy) return;
    const damage = Math.floor(enemy.atk * (0.8 + Math.random() * 0.4));
    setHp(prev => {
      const newHp = prev - damage;
      addLog(`${enemy.name} 对你造成 ${damage} 点伤害！`, 'combat');
      if (newHp <= 0) {
        addLog('💀 你被击败了！游戏结束...', 'combat');
        addLog(`最终等级: ${level}, 击杀数: ${kills}, 探索深度: ${depth}`, 'combat');
      }
      return Math.max(0, newHp);
    });
  }, [enemy, level, kills, depth, addLog]);

  const playerAttack = useCallback(() => {
    if (!inBattle || !enemy) return;

    const damage = Math.floor(atk * (0.9 + Math.random() * 0.2));
    const newEnemyHp = enemy.hp - damage;

    addLog(`你对 ${enemy.name} 造成 ${damage} 点伤害`, 'combat');

    if (newEnemyHp <= 0) {
      addLog(`击败了 ${enemy.name}！`, 'combat');
      setGold(prev => prev + enemy.gold);
      setKills(prev => prev + 1);
      addLog(`获得 ${enemy.exp} 经验值, ${enemy.gold} 金币`, 'loot');
      gainExp(enemy.exp);

      if (Math.random() < 0.3) {
        const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        setInventory(prev => ({
          ...prev,
          [item.name]: { ...item, count: (prev[item.name]?.count || 0) + 1 }
        }));
        addLog(`获得物品: ${item.name}`, 'loot');
      }

      setEnemy(null);
      setInBattle(false);
    } else {
      setEnemy({ ...enemy, hp: newEnemyHp });
      enemyAttack();
    }
  }, [inBattle, enemy, atk, enemyAttack, gainExp, addLog]);

  const useSkill = useCallback((skillIndex: number) => {
    if (!inBattle || !enemy) return;

    const skill = skills[skillIndex];
    if (!skill || !skill.unlocked || skill.currentCd > 0) return;

    setSkills(prev => prev.map((s, i) =>
      i === skillIndex ? { ...s, currentCd: s.cd } : s
    ));

    let totalDamage = 0;
    const hits = skill.hits || 1;
    let newEnemyHp = enemy.hp;

    for (let i = 0; i < hits; i++) {
      const damage = Math.floor(atk * skill.damage * (0.9 + Math.random() * 0.2));
      newEnemyHp -= damage;
      totalDamage += damage;
    }

    addLog(`你使用 ${skill.name} 造成 ${totalDamage} 点伤害！`, 'combat');

    if (newEnemyHp <= 0) {
      addLog(`击败了 ${enemy.name}！`, 'combat');
      setGold(prev => prev + enemy.gold);
      setKills(prev => prev + 1);
      addLog(`获得 ${enemy.exp} 经验值, ${enemy.gold} 金币`, 'loot');
      gainExp(enemy.exp);

      if (Math.random() < 0.3) {
        const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        setInventory(prev => ({
          ...prev,
          [item.name]: { ...item, count: (prev[item.name]?.count || 0) + 1 }
        }));
        addLog(`获得物品: ${item.name}`, 'loot');
      }

      setEnemy(null);
      setInBattle(false);
    } else {
      setEnemy({ ...enemy, hp: newEnemyHp });
      enemyAttack();
    }
  }, [inBattle, enemy, skills, atk, enemyAttack, gainExp, addLog]);

  const explore = useCallback(() => {
    if (inBattle) {
      addLog('战斗中无法探索！', 'combat');
      return;
    }

    const newDepth = depth + 1;
    setDepth(newDepth);

    const location = LOCATIONS.slice().reverse().find(l => newDepth >= l.minDepth) || LOCATIONS[0];
    addLog(`你来到了${location.name}，探索深度: ${newDepth}`, 'explore');

    if (Math.random() < location.enemyChance) {
      spawnEnemy();
    } else {
      const events = [
        { msg: '你发现了一些金币！', gold: 10 },
        { msg: '你找到了一个宝箱！', item: true },
        { msg: '这里什么都没有...' },
        { msg: '你发现了一处安全的休息点', heal: 20 },
        { msg: '你感觉到一股神秘的力量', exp: 20 }
      ];
      const event = events[Math.floor(Math.random() * events.length)];
      addLog(event.msg, 'explore');

      if (event.gold) {
        setGold(prev => prev + event.gold!);
        addLog(`获得 ${event.gold} 金币`, 'loot');
      }
      if (event.exp) {
        gainExp(event.exp);
      }
      if (event.heal) {
        setHp(prev => Math.min(maxHp, prev + event.heal!));
        addLog(`恢复 ${event.heal} 点生命值`, 'explore');
      }
      if (event.item) {
        const item = ITEMS[Math.floor(Math.random() * ITEMS.length)];
        setInventory(prev => ({
          ...prev,
          [item.name]: { ...item, count: (prev[item.name]?.count || 0) + 1 }
        }));
        addLog(`获得物品: ${item.name}`, 'loot');
      }
    }
  }, [inBattle, depth, spawnEnemy, gainExp, maxHp, addLog]);

  const rest = useCallback(() => {
    if (inBattle) {
      addLog('战斗中无法休息！', 'combat');
      return;
    }

    const heal = Math.floor(maxHp * 0.3) + 10;
    setHp(prev => Math.min(maxHp, prev + heal));
    addLog(`你休息了一会儿，恢复 ${heal} 点生命值`, 'explore');
  }, [inBattle, maxHp, addLog]);

  const autoBattleAction = useCallback(() => {
    for (let i = skills.length - 1; i >= 0; i--) {
      if (skills[i].unlocked && skills[i].currentCd === 0) {
        useSkill(i);
        return;
      }
    }
    playerAttack();
  }, [skills, useSkill, playerAttack]);

  const buyUpgrade = useCallback((index: number) => {
    const upgrade = upgrades[index];
    if (gold < upgrade.cost) return;

    setGold(prev => prev - upgrade.cost);

    switch (upgrade.effect) {
      case 'maxHp':
        setMaxHp(prev => prev + upgrade.value);
        setHp(prev => prev + upgrade.value);
        break;
      case 'atk':
        setAtk(prev => prev + upgrade.value);
        break;
    }

    setUpgrades(prev => prev.map((u, i) =>
      i === index ? { ...u, cost: Math.floor(u.cost * 1.3) } : u
    ));

    addLog(`购买了 ${upgrade.name}！`, 'levelup');
  }, [upgrades, gold, addLog]);

  const useItem = useCallback((itemName: string) => {
    const item = inventory[itemName];
    if (!item || item.count <= 0) return;

    switch (item.effect) {
      case 'heal':
        setHp(prev => Math.min(maxHp, prev + item.value!));
        addLog(`使用 ${item.name}，恢复 ${item.value} 点生命值`, 'explore');
        break;
      case 'exp':
        gainExp(item.value!);
        addLog(`使用 ${item.name}，获得 ${item.value} 经验值`, 'levelup');
        break;
    }

    setInventory(prev => {
      const newInv = { ...prev };
      if (newInv[itemName].count <= 1) {
        delete newInv[itemName];
      } else {
        newInv[itemName] = { ...newInv[itemName], count: newInv[itemName].count - 1 };
      }
      return newInv;
    });
  }, [inventory, maxHp, gainExp, addLog]);

  const renderLogEntryClass = (type: string) => {
    const classes = ['log-entry'];
    if (type) classes.push(type);
    return classes.join(' ');
  };

  return (
    <div className="game-container">
      <h1>⚔️ 无尽探索 ⚔️</h1>

      <div className="stats-panel">
        <div className="stat-item">
          <div className="stat-label">等级</div>
          <div className="stat-value">{level}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">生命值</div>
          <div className="stat-value">{Math.floor(hp)}/{maxHp}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">攻击力</div>
          <div className="stat-value">{atk}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">金币</div>
          <div className="stat-value">{gold}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">经验值</div>
          <div className="stat-value">{Math.floor(exp)}/{maxExp}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">探索深度</div>
          <div className="stat-value">{depth}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">击杀数</div>
          <div className="stat-value">{kills}</div>
        </div>
        <div className="stat-item">
          <div className="stat-label">技能点</div>
          <div className="stat-value">{skillPoints}</div>
        </div>
      </div>

      <div className="main-area">
        <div className="log-panel">
          <h3>📜 冒险日志</h3>
          <div className="log-content">
            {logs.map((log, index) => (
              <div key={index} className={renderLogEntryClass(log.type)}>
                {log.message}
              </div>
            ))}
          </div>
        </div>

        <div className="side-panel">
          <div className="location-panel">
            <h3>📍 当前位置</h3>
            <div className="location-name">{currentLocation.name}</div>
            <div className="location-desc">{currentLocation.desc}</div>
          </div>

          {inBattle && enemy && (
            <div className="enemy-panel">
              <h3>👹 遭遇敌人</h3>
              <div className="enemy-name">{enemy.name}</div>
              <div className="enemy-level">等级 {enemy.level}</div>
              <div className="health-bar">
                <div className="health-fill" style={{ width: `${(enemy.hp / enemy.maxHp) * 100}%` }} />
              </div>
              <div className="health-text">{Math.floor(enemy.hp)}/{enemy.maxHp}</div>
            </div>
          )}
        </div>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${activeTab === 'battle' ? 'active' : ''}`} onClick={() => setActiveTab('battle')}>⚔️ 战斗</button>
        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>✨ 技能</button>
        <button className={`tab-btn ${activeTab === 'upgrade' ? 'active' : ''}`} onClick={() => setActiveTab('upgrade')}>⬆️ 强化</button>
        <button className={`tab-btn ${activeTab === 'inventory' ? 'active' : ''}`} onClick={() => setActiveTab('inventory')}>🎒 背包</button>
      </div>

      <div className={`tab-content ${activeTab === 'battle' ? 'active' : ''}`} id="tab-battle">
        <div className="control-panel">
          <button className="btn btn-attack" onClick={playerAttack} disabled={!inBattle}>⚔️ 攻击</button>
          <button
            className="btn btn-skill"
            onClick={() => useSkill(0)}
            disabled={!inBattle || !skills[0].unlocked || skills[0].currentCd > 0}
          >
            {skills[0].currentCd > 0 ? `${skills[0].name} (${skills[0].currentCd})` : skills[0].unlocked ? '🔥 火球术' : '🔒 未解锁'}
          </button>
          <button
            className="btn btn-skill"
            onClick={() => useSkill(1)}
            disabled={!inBattle || !skills[1].unlocked || skills[1].currentCd > 0}
          >
            {skills[1].currentCd > 0 ? `${skills[1].name} (${skills[1].currentCd})` : skills[1].unlocked ? '⚡ 雷霆一击' : '🔒 未解锁'}
          </button>
        </div>
        <div className="control-panel">
          <button className="btn btn-explore" onClick={explore}>🗺️ 探索</button>
          <button className="btn btn-rest" onClick={rest}>🏕️ 休息</button>
          <button className="btn btn-upgrade" onClick={() => setActiveTab('upgrade')}>⬆️ 升级</button>
        </div>
        <div className="auto-battle">
          <label>
            <div
              className={`toggle-switch ${autoBattle ? 'active' : ''}`}
              onClick={() => setAutoBattle(prev => !prev)}
            />
            <span>自动战斗</span>
          </label>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'skills' ? 'active' : ''}`}>
        <div className="skills-panel">
          <h3>✨ 技能列表</h3>
          <div className="skill-list">
            {skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="skill-info">
                  <div className="skill-name">{skill.unlocked ? skill.name : '???'}</div>
                  <div className="skill-desc">{skill.unlocked ? skill.desc : '达到特定等级后解锁'}</div>
                  {skill.unlocked && <div className="skill-cd">冷却: {skill.cd}秒</div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'upgrade' ? 'active' : ''}`}>
        <div className="upgrade-panel">
          <h3>⬆️ 属性强化</h3>
          <div className="upgrade-list">
            {upgrades.map((upgrade, index) => (
              <div key={index} className="upgrade-item">
                <div className="upgrade-info">
                  <div className="upgrade-name">{upgrade.name}</div>
                  <div className="upgrade-effect">{upgrade.desc}</div>
                  <div className="upgrade-cost">💰 {upgrade.cost} 金币</div>
                </div>
                <button
                  className="btn btn-upgrade btn-small"
                  onClick={() => buyUpgrade(index)}
                  disabled={gold < upgrade.cost}
                >
                  购买
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className={`tab-content ${activeTab === 'inventory' ? 'active' : ''}`}>
        <div className="inventory-panel">
          <h3>🎒 物品背包</h3>
          <div className="inventory-grid">
            {Array.from({ length: 20 }).map((_, index) => {
              const items: InventoryItem[] = Object.values(inventory);
              const item = items[index];
              return (
                <div
                  key={index}
                  className="inventory-slot"
                  onClick={() => item && useItem(item.name)}
                >
                  {item && (
                    <>
                      <span className="item-name">{item.name}</span>
                      <span className="item-count">x{item.count}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
