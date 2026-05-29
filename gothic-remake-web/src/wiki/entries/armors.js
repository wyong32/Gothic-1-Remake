export default {
  sections: [
    {
      id: 'camp-armor',
      title: 'Camp & Faction Armor',
      entries: [
        { name: 'Shadow Garb', summary: 'Old Camp join reward — marks affiliation, reduces guard hostility.', tags: ['Old Camp'], wiki: 'Shadow Garb' },
        { name: 'Light Bandit Clothing', summary: 'New Camp join reward — rogue starter protection.', tags: ['New Camp'], wiki: 'Light Bandit Clothing' },
        { name: 'Novice Robe', summary: 'Swamp Camp join reward — low physical armor, high magic affinity.', tags: ['Swamp Camp'], wiki: 'Novice Robe' },
        { name: 'Guard Armor', summary: 'Old Camp veteran plate — blunt/edge resist focus.', tags: ['Late Old'], wiki: 'Guard Armor' },
        { name: 'Mercenary Armor', summary: 'New Camp veteran gear — balanced mid-tier.', tags: ['Late New'], wiki: 'Mercenary Armor' },
        { name: 'Templar Armor', summary: 'Swamp hybrid class — distinctive tattoos and 2H focus.', tags: ['Templar'], wiki: 'Templar Armor' },
      ],
    },
    {
      id: 'resistances',
      title: 'Remake Resistance Types',
      intro: 'Armor provides resistances — not trainable via LP.',
      entries: [
        { name: 'Blunt / Edge / Point', summary: 'Physical damage categories from weapons.', tags: ['Physical'], wiki: 'Armor' },
        { name: 'Fire / Ice / Wind / Energy', summary: 'Elemental rune and magic damage types.', tags: ['Elemental'], wiki: 'Armor' },
        { name: 'Falling', summary: 'Vertical map hazard mitigation on select gear.', tags: ['Remake'], wiki: 'Armor' },
      ],
    },
  ],
}
