export default {
  data: {
    name: '被封印的艾克佐迪亚',
    type: 'monster',
    subtypes: ['effect'],
    level: 3,
    attack: 1000,
    defend: 1000,
    monster_type: 'spellcaster',
    desc: `
      这张卡和「被封印者的右足」「被封印者的左足」「被封印者的右腕」「被封印者的左腕」在手卡全部齐集时，决斗胜利。
    `,
  },
  // 生命周期
  lifecycle: {
    addHand: {
      condition: ({ entity }) => {
        const hands = new Set(entity.controller.hands.map(item => item.id));
        return ['6666', '7777', '8888', '9999'].every(item => hands.has(item));
      },
      effect: ({ duel }) => {
        duel.win();
      },
    },
  },
  // 诱发效果
  on: {
    addHand: {
      condition({ entity, duel }) {
        if (entity === duel.self) {
          const hands = new Set(entity.hands.map(item => item.id));
          return ['6666', '7777', '8888', '9999'].every(item => hands.has(item));
        }
      },
      effect: ({ duel }) => {
        duel.win();
      },
    },
  },
}