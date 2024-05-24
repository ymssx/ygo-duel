export default {
  data: {
    name: '测试怪兽-1',
    type: 'monster',
    subtypes: ['effect'],
    level: 4,
    desc: `
      1. 这张卡召唤成功时，舍弃一张手卡，以场上一张表侧表示怪兽为对象发动，那只怪兽破坏，那之后自己抽一张卡。
      2. 这张卡进行战斗的场合，攻击怪兽在伤害阶段攻击力下降1000。
      3. 当对方召唤怪兽的场合必定发动，这张卡的控制者可以抽一张卡。
      4. 只要这张卡在场上存在，对方无法进行特殊召唤，对方场上的怪兽攻击力下降1000。
      5. 双方主要阶段可以发动，把这张卡解放发动，从墓地选一张怪兽特殊召唤。
    `,
  },
  // 生命周期
  lifecycle: {
    summon: {
      cost: ({ controller }) => controller.drop({ num: 1 }),
      target: ({ duel }) => duel.userTarget({
        range: duel.opponent.fields.getMonsters({ status: 'face-up' }),
        num: 1,
      }),
      effect: ({ target, entity, controller }) => {
        target.distroy({ type: 'effect', source: entity });
        controller.draw(1);
      },
    },
    battle: ({ target, duel }) => {
      const recover = target.changeStatus({ type: 'attack', num: 1000 });
      duel.addEvent({ after_damage: recover }, { once: true });
    },
  },
  // 诱发效果
  on: {
    main_step: {
      cost: ({ entity }) => entity.sacrifice(),
      effect: ({ controller }) => controller.specialFromGrave({ num: 1 }),
    },
    summon: {
      must: true, // 必定发动
      effect: ({ controller }) => controller.draw(1),
    },
  },
  // 某种状态下才生效的永续效果
  status: {
    field: ({ duel }) => {
      // duel.opponent.field.getMonsters().forEach(monster => {
      //   monster.cannotAttack += 1;
      // });
    }
  },
}