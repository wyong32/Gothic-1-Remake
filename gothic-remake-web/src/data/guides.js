export default [
  {
    id: 1,
    title: 'Gothic 1 Remake vs the 2001 Original — What Actually Changed',
    description:
      'Side-by-side look at combat, navigation, professions, map size, quests, and pacing — what Alkimia kept, what they cut, and what they fixed from retail Gothic.',
    tags: [
      'Remake vs Original',
      'Combat',
      'No Minimap',
      'Professions Removed',
      'UE5',
      'Side Quests',
      'Orc Lore',
      'June 5 2026',
      'Alkimia Interactive',
      'THQ Nordic',
      'Classic Controls',
      'LP Trainers',
    ],
    publishDate: '2026-05-29',
    imageUrl: '/images/guides/guides01.webp',
    imageAlt: 'Gothic 1 Remake valley compared to the classic 2001 colony',
    seo: {
      title: 'Gothic 1 Remake vs Original — 2001 Comparison Guide',
      description:
        'Gothic 1 Remake vs Gothic 2001: combat, dodge and block, map size, professions removed, no minimap, expanded orc quests, and UE5 changes for returning players.',
      keywords:
        'Gothic 1 Remake vs original, Gothic Remake changes, 2001 comparison, combat, professions, minimap, Alkimia Interactive',
    },
    addressBar: 'remake-vs-original',
    isHome: true,
    detailsHtml: `
<h2 id="bottom-line">The short version</h2>
<p>This is not a texture mod. Alkimia rebuilt Gothic in Unreal Engine 5 after the 2019 teaser got roasted for feeling like a generic action RPG. The colony still has no quest markers, you still pay ore to trainers, and you still pick Old, New, or Swamp Camp in Chapter 1. What changed is how fights feel, how big the valley is, and how much optional stuff exists once you stop speedrunning the main plot.</p>
<ul class="guide-inline-tags"><li>Faithful rebuild</li><li>Not a remaster</li><li>June 5 2026 launch</li></ul>
<aside class="guide-callout guide-callout--tip"><strong>Who this is for</strong><p>Veterans wondering if professions are really gone. New players who only know “hard old RPG, no markers.” Anyone comparing demo footage to Gothic 1 on GOG.</p></aside>

<h2 id="unchanged">What stayed the same (on purpose)</h2>
<p>Reinhard Pollice’s team repeated this in every making-of: keep the skeleton, upgrade the muscles. These are the pillars they refused to drop even when UE5 made flashier options easy.</p>
<ul class="guide-list">
<li>No minimap, no quest markers — journal and NPC directions only</li>
<li>Strength, Dexterity, Mana, Learning Points, ore-paid trainers</li>
<li>Three camps, Sleeper arc, focus stones, Xardas pivot, barrier finale</li>
<li>Directional melee at its core — not God of War button chains</li>
<li>Kai Rosenkranz score re-recorded; many original voice actors back where contracts allowed</li>
<li>German dub still treated as the reference language for lip sync</li>
</ul>
<figure class="guide-figure"><img src="/images/guides/guides01-01.webp" alt="Remake journal and paper map without waypoint markers" width="800" height="450" loading="lazy" /><figcaption>Navigation is still diegetic — if an NPC says “old tower,” you walk until you see it.</figcaption></figure>

<h2 id="combat">Combat — awkward start, then you earn the swing</h2>
<p>The 2019 playable teaser used generic hack-and-slash. Fans hated it. Alkimia threw that out and tied animation speed to trainer tiers again — same idea as 2001, just readable on a DualSense in 2026.</p>
<div class="guide-table-wrap"><table class="data-table guide-table"><caption>Combat — 2001 retail vs Remake (Gamescom / demo builds)</caption><thead><tr><th scope="col">Topic</th><th scope="col">Gothic (2001)</th><th scope="col">Gothic 1 Remake</th></tr></thead><tbody>
<tr><td>Base attacks</td><td>Left, right, thrust, overhead</td><td>Same four directions, plus combo chains at higher tiers</td></tr>
<tr><td>Training gate</td><td>LP at Scatty, Cord, Gor-Na-Toth</td><td>Same — untrained hero swings like a farm tool</td></tr>
<tr><td>Dodge / block</td><td>Not in original</td><td>Added — can interrupt wind-up once trained</td></tr>
<tr><td>Lock-on</td><td>N/A</td><td>Added after demo camera complaints</td></tr>
<tr><td>Finishers</td><td>Knockdown existed</td><td>Knockdown + explicit finish attacks</td></tr>
<tr><td>Health feedback</td><td>No bars</td><td>Enemy HP bars in combat</td></tr>
<tr><td>Bow</td><td>Underdeveloped</td><td>Manual aim, Dex scaling</td></tr>
<tr><td>Shields / helmets</td><td>Never in Gothic 1</td><td>Still no — dev podcasts confirmed</td></tr>
</tbody></table></div>
<aside class="guide-callout guide-callout--warning"><strong>Demo reality check</strong><p>Pre-training scavenger packs still delete unprepared players. That is intentional. Pay Scatty before you hero-walk into the valley.</p></aside>
<ul class="guide-inline-tags"><li>Directional melee</li><li>Dodge</li><li>Block</li><li>Lock-on</li><li>Bow aim</li><li>No shields</li></ul>

<h2 id="navigation">UI and controls</h2>
<p>THQ Nordic marketing loves saying “no hand-holding.” Mechanically that means the Remake adds quality-of-life without turning the map into a Ubisoft checklist.</p>
<ul class="guide-list">
<li>Journal glossary helps with names — it does not ping objectives on the HUD</li>
<li>Classic control scheme toggle for gamepad veterans of the ZenGin original</li>
<li>Mouse sensitivity sliders were missing in early demos — check launch patch notes</li>
<li>Health bars are a combat UI add, not an exploration crutch</li>
</ul>
<figure class="guide-figure"><img src="/images/guides/guides01-02.webp" alt="Remake settings showing classic control layout option" width="800" height="450" loading="lazy" /><figcaption>Settings include a classic layout — useful if muscle memory still expects 2001 shoulder buttons.</figcaption></figure>

<h2 id="world">World size, pacing, and NPC life</h2>
<p>Classic Gothic’s dirty secret: skilled players could stomp most of the map in Chapter 1, then sprint through chapters 2–3 feeling over-leveled. Alkimia publicly said they targeted that pacing problem. Exact gating is still being tuned pre-launch, but the valley is physically larger and denser.</p>
<div class="guide-table-wrap"><table class="data-table guide-table"><caption>Open world scale</caption><thead><tr><th scope="col">Metric</th><th scope="col">2001</th><th scope="col">Remake</th></tr></thead><tbody>
<tr><td>Engine</td><td>Genode / ZenGin</td><td>Unreal Engine 5</td></tr>
<tr><td>Map footprint</td><td>Baseline valley</td><td>Roughly 10–30% larger (dev interviews)</td></tr>
<tr><td>Empty zones</td><td>Many filler hills</td><td>Cut content and new paths filled in</td></tr>
<tr><td>NPC schedules</td><td>Basic cycles</td><td>Work, meals, weather reactions, camp routines</td></tr>
<tr><td>Playtime (main)</td><td>~50 hours cited</td><td>Similar main arc + more camp-specific routes</td></tr>
</tbody></table></div>
<ul class="guide-inline-tags"><li>UE5</li><li>Larger valley</li><li>NPC routines</li><li>Pacing fix</li></ul>

<h2 id="quests">Quests, story fixes, and orc content</h2>
<p>Retail Gothic had thin side content after Chapter 1 and lore holes fans patched with forum lore for twenty years. The Remake uses that spare capacity — not by rewriting the Sleeper plot, but by giving underused NPCs and regions actual jobs.</p>
<ul class="guide-list">
<li>Profession system removed — no brewer / hunter / alchemist job tracks from Gothic 1</li>
<li>Old side quests expanded; camp-specific chains added (especially New and Swamp routes)</li>
<li>Plot holes addressed — Orry, Mist Tower threads, logical gaps in the Old Camp betrayal arc</li>
<li>Orc culture expanded — emissary quests, language work, non-lethal branches in artifact chapters</li>
<li>Mixer coastal arc and diving skill — sunken wrecks near Nebel Tower area</li>
<li>Chromatin / Stranger chain still exists — still book-hunting without waypoints</li>
</ul>
<aside class="guide-callout guide-callout--tip"><strong>Veteran grudge point</strong><p>Professions are the biggest cut. If you lived for the brewer loop, you will feel it. If you only remember the main plot and camp join quests, you gain content instead.</p></aside>
<figure class="guide-figure"><img src="/images/guides/guides01-03.webp" alt="Swamp Camp novices on a ritual quest in the Remake" width="800" height="450" loading="lazy" /><figcaption>Swamp and New Camp routes pick up much of the slack from removed professions.</figcaption></figure>

<h2 id="systems">Gear, resistances, and crafting</h2>
<p>Armor is not just a flat armor number anymore. Weapons and cooking got more granular than the 2001 inventory spreadsheet.</p>
<div class="guide-table-wrap"><table class="data-table guide-table"><caption>Systems comparison</caption><thead><tr><th scope="col">System</th><th scope="col">2001</th><th scope="col">Remake</th></tr></thead><tbody>
<tr><td>Armor model</td><td>Single protection value</td><td>Blunt, edge, point, fire, ice, wind, energy, falling</td></tr>
<tr><td>Armor look</td><td>Fixed mesh per item</td><td>Minor visual tweaks via modifications</td></tr>
<tr><td>Smithing / food</td><td>Basic</td><td>Expanded weapon and cooking pipelines</td></tr>
<tr><td>Face count</td><td>Repeated NPC faces</td><td>Hundreds of morphed variants (AI-assisted pipeline)</td></tr>
<tr><td>Diving</td><td>Not a skill</td><td>New skill — Mist Tower wrecks and coastal content</td></tr>
</tbody></table></div>
<ul class="guide-inline-tags"><li>Resistances</li><li>Crafting</li><li>Diving</li><li>Armor mods</li></ul>

<h2 id="full-table">Master comparison table</h2>
<p>Print this mentally before you argue on a forum. Values may shift on the June 5 patch — we will update after launch week.</p>
<div class="guide-table-wrap"><table class="data-table guide-table"><caption>Gothic (2001) vs Gothic 1 Remake — at a glance</caption><thead><tr><th scope="col">Topic</th><th scope="col">Gothic (2001)</th><th scope="col">Gothic 1 Remake (2026)</th></tr></thead><tbody>
<tr><td>Release</td><td>March 2001 (EU)</td><td>June 5, 2026 — PC, PS5, Xbox Series X|S</td></tr>
<tr><td>Developer</td><td>Piranha Bytes</td><td>Alkimia Interactive (THQ Nordic)</td></tr>
<tr><td>Quest markers</td><td>None</td><td>Still none</td></tr>
<tr><td>Minimap</td><td>None</td><td>Still none</td></tr>
<tr><td>Professions</td><td>Yes</td><td>Removed</td></tr>
<tr><td>Combat feel</td><td>Clunky until trained</td><td>Clunky until trained, plus dodge/block</td></tr>
<tr><td>Map size</td><td>Baseline</td><td>~10–30% larger</td></tr>
<tr><td>Orc content</td><td>Minimal diplomacy</td><td>Expanded emissary / language lines</td></tr>
<tr><td>Voice / music</td><td>Iconic German cast</td><td>Re-recorded where possible + Rosenkranz score</td></tr>
<tr><td>Always-online</td><td>N/A</td><td>No — day-one patch, then offline per THQ statements</td></tr>
</tbody></table></div>

<h2 id="verdict">Should you care?</h2>
<p>If you wanted Gothic 1 with modern lighting and zero design risk, this is close. If you wanted professions untouched and zero combat additions, you will nitpick dodge rolls on principle. For most players the question is simpler: do you want the colony with more side meat and fewer dead zones? That is what the Remake is selling.</p>
<ul class="guide-list">
<li>New players: treat it as the “definitive” hard RPG version — start with our Beginner page, not this rant</li>
<li>2001 veterans: replay for camp routes you skipped and orc lines you never saw</li>
<li>Speedrunners: assume pacing gates differ — old chapter breaks may not match</li>
</ul>
<aside class="guide-callout guide-callout--tip"><strong>After launch</strong><p>Ship values for XP and ore prices may differ slightly from Gothic 1 spreadsheets. We patch guides from player reports, not press releases.</p></aside>
`.trim(),
  },
]
