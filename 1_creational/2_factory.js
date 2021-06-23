//представьте, что у вас есть коллекция элементов, которая похожа по своему функционалу

class SimpleMembership {
  constructor(name) {
    this.name = name
    this.cost = 50
  }
}

class StandardMembership {
  constructor(name) {
    this.name = name
    this.cost = 150
  }
}

class PremiumMembership {
  constructor(name) {
    this.name = name
    this.cost = 500
  }
}

//они похожи, поэтому мы могли бы создать некоторую абстракцию, сущность, которая объединяет эти классы и уже сама определяет
//какой инстанс создавать в зависимости от типа. Это и является концептом фабрики

class MemberFactory {
  //это объект, который позволяет более удобно взаимодействовать с factory
  static list = {
    simple: SimpleMembership,
    standard: StandardMembership,
    premium: PremiumMembership
  }

  // с пом-ю метода будем создавать какой-либо нужный нам инстанс
  create(name, type = "simple") {
    const Membership = MemberFactory.list[type] || MemberFactory.list.simple   // пишу с большой буквы потому что знаю что сюда будет записываться именно класс
    const member = new Membership(name)

    //можем добавлять какие-то мета данные, что тоже яв-ся плюсом factory
    member.type = type
    member.define = function() {
      console.log(`${this.name} (${this.type}): ${this.cost}`);
    }

    return member
  }
}

const factory = new MemberFactory()
const standard = factory.create('standard')

const members = [
  factory.create('Yevgeniy'),
  factory.create('Janar', 'premium'),
  factory.create('Diana', 'standard')
]


members.forEach(item => {
  item.define()
})