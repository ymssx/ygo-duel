export default {
  data: {
    name: '贪欲之壶',
    desc: '从卡组抽两张卡',
    type: 'spell',
  },
  lifecycle: {
    activate({ self }) {
      self.draw(2);
    },
  },
};