export default {
  sections: [
    {
      id: 'one-handed',
      title: 'One-Handed Weapons',
      intro: 'Train Tier 1 & 2 with Cord, Scatty, or Gor-Na-Toth for animation upgrades.',
      entries: [
        { name: 'Sword', summary: 'Standard convict blade — STR gated progression.', tags: ['1H'], wiki: 'Sword' },
        { name: 'Mace', summary: 'Blunt damage — effective vs armored guards.', tags: ['1H'], wiki: 'Mace' },
        { name: 'Axe', summary: 'Edge damage — ore purchases from camp smiths.', tags: ['1H'], wiki: 'Axe' },
      ],
    },
    {
      id: 'two-handed',
      title: 'Two-Handed Weapons',
      entries: [
        { name: 'Two-Handed Sword', summary: 'Guard/Mercenary veteran rank unlock — Templar staple.', tags: ['2H'], wiki: 'Two-handed sword' },
        { name: 'Halberd', summary: 'Long reach — slower wind-up until mastery.', tags: ['2H'], wiki: 'Halberd' },
      ],
    },
    {
      id: 'ranged',
      title: 'Ranged Weapons',
      entries: [
        { name: 'Bow', summary: 'DEX scaling — manual aim in Remake.', tags: ['Ranged'], wiki: 'Bow' },
        { name: 'Crossbow', summary: 'STR scaling — defer until hybrid builds.', tags: ['Ranged'], wiki: 'Crossbow' },
      ],
    },
  ],
}
