export default {
  sections: [
    {
      id: 'early',
      title: 'Early Game',
      intro: 'Creatures encountered before camp join and basic weapon training.',
      entries: [
        { name: 'Scavenger', summary: 'Exchange zone pests — first combat tutorials.', tags: ['Exchange'], wiki: 'Scavenger' },
        { name: 'Bloodfly', summary: 'Swamp and riverbank swarms — poison and pack aggression.', tags: ['Swamp'], wiki: 'Bloodfly' },
        { name: 'Wolf', summary: 'Forest road ambushes — kills unarmored convicts quickly.', tags: ['Wilderness'], wiki: 'Wolf' },
        { name: 'Lurker', summary: 'River predators — dam quest and audio cue near water.', tags: ['River'], wiki: 'Lurker' },
      ],
    },
    {
      id: 'mid',
      title: 'Mid Game',
      entries: [
        { name: 'Minecrawler', summary: 'Old Mine nest — Chapter 2 egg delivery to Cor Kalom.', tags: ['Dungeon'], wiki: 'Minecrawler' },
        { name: 'Snapper', summary: 'Armored beasts — hunting trophies and ore income.', tags: ['Hunting'], wiki: 'Snapper' },
        { name: 'Troll', summary: 'High HP brutes — focus stone zones and late valleys.', tags: ['High danger'], wiki: 'Troll' },
        { name: 'Shadowbeast', summary: 'Deadly night hunters — shadowbeast dens end careless runs.', tags: ['Lethal'], wiki: 'Shadowbeast' },
      ],
    },
    {
      id: 'late',
      title: 'Late Game',
      entries: [
        { name: 'Orc', summary: 'Orc territory guards — Chapter 5 town and Uriziel arc.', tags: ['Orc Town'], wiki: 'Orc' },
        { name: 'Undead Orc Shaman', summary: 'Sleeper Temple bosses — five hearts puzzle.', tags: ['Chapter 6'], wiki: 'Undead Orc Shaman' },
        { name: 'Skeleton Mage', summary: 'Mist Tower undead — Stranger book guardians.', tags: ['Coast'], wiki: 'Skeleton Mage' },
      ],
    },
  ],
}
