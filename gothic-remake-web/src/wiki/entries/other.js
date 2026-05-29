export default {
  sections: [
    {
      id: 'attributes',
      title: 'Attributes & Progression',
      entries: [
        { name: 'Strength', summary: 'Melee damage and carry weight — Scatty trains to ~100 cap.', tags: ['Core'], wiki: 'Strength' },
        { name: 'Dexterity', summary: 'Bow, pickpocket, lockpick — Cavalorn trainer.', tags: ['Core'], wiki: 'Dexterity' },
        { name: 'Mana', summary: 'Spell pool — fire/water mage trainers.', tags: ['Core'], wiki: 'Mana' },
        { name: 'Learning Points', summary: '10 LP per level — must spend at trainers with ore.', tags: ['Mechanic'], wiki: 'Learning Points' },
      ],
    },
    {
      id: 'skills',
      title: 'Skills & Remake Systems',
      entries: [
        { name: 'One-Handed / Two-Handed Combat', summary: 'Two LP tiers per weapon line for animation mastery.', tags: ['Combat'], wiki: 'One-Handed Combat' },
        { name: 'Sneak & Pickpocket', summary: 'Fingers trainer — night looting without witnesses.', tags: ['Utility'], wiki: 'Sneak' },
        { name: 'Alchemy', summary: 'Swamp specialty — potion economy loop.', tags: ['Utility'], wiki: 'Alchemy' },
        { name: 'Diving', summary: 'Remake new skill — Mist Tower wreck interiors.', tags: ['Remake'], wiki: 'Diving' },
        { name: 'Ore', summary: 'Colony currency — LP payments, maps, gear.', tags: ['Economy'], wiki: 'Ore' },
      ],
    },
  ],
}
