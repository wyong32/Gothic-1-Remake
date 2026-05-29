export default {
  sections: [
    {
      id: 'consumables',
      title: 'Standard Potions',
      entries: [
        { name: 'Health Potion', summary: 'Instant HP restore — buy or brew early.', tags: ['Combat'], wiki: 'Health Potion' },
        { name: 'Mana Potion', summary: 'Spell fuel — critical for mage opening hours.', tags: ['Magic'], wiki: 'Mana Potion' },
        { name: 'Prepared Dreamcall', summary: 'Swamp alchemy product — Customer Recruitment quest reward.', tags: ['Swamp'], wiki: 'Prepared Dreamcall' },
      ],
    },
    {
      id: 'elixirs',
      title: 'Permanent Elixirs',
      intro: 'Do not drink before maxing trainer attributes — see Beginner mistakes FAQ.',
      entries: [
        { name: 'Elixir of Strength', summary: 'Permanent +STR boost — save for post-cap.', tags: ['Permanent'], wiki: 'Elixir of Strength' },
        { name: 'Elixir of Dexterity', summary: 'Permanent +DEX boost.', tags: ['Permanent'], wiki: 'Elixir of Dexterity' },
        { name: 'Elixir of Mana', summary: 'Permanent +Mana boost.', tags: ['Permanent'], wiki: 'Elixir of Mana' },
      ],
    },
    {
      id: 'herbs',
      title: 'Herbs & Ingredients',
      entries: [
        { name: 'Swampweed', summary: 'Swamp Camp harvest quest — alchemy base.', tags: ['Herb'], wiki: 'Swampweed' },
        { name: 'Blueberry / Hellshroom', summary: 'Early junk trade goods for ore at merchants.', tags: ['Junk'], wiki: 'Blueberry' },
      ],
    },
  ],
}
