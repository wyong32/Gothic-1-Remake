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
<p>This is not a texture mod. Alkimia rebuilt Gothic in Unreal Engine 5 after the 2019 teaser got roasted for feeling like a generic action RPG. The colony still has no quest markers, you still pay ore to trainers, and you still pick <a href="/factions-builds">Old, New, or Swamp Camp</a> in Chapter 1. What changed is how fights feel, how big the valley is, and how much optional stuff exists once you stop speedrunning the main plot.</p>
<ul class="guide-inline-tags"><li>Faithful rebuild</li><li>Not a remaster</li><li>June 5 2026 launch</li></ul>
<aside class="guide-callout guide-callout--tip"><strong>Who this is for</strong><p>Veterans wondering if professions are really gone. New players who only know “hard old RPG, no markers.” Anyone comparing demo footage to Gothic 1 on GOG.</p></aside>

<h2 id="unchanged">What stayed the same (on purpose)</h2>
<p>Reinhard Pollice’s team repeated this in every making-of: keep the skeleton, upgrade the muscles. These are the pillars they refused to drop even when UE5 made flashier options easy.</p>
<ul class="guide-list">
<li>No minimap, no quest markers — journal and NPC directions only</li>
<li>Strength, Dexterity, Mana, <a href="/wiki/other">Learning Points</a>, ore-paid trainers</li>
<li>Three camps, <a href="/wiki/gods">Sleeper</a> arc, <a href="/wiki/artifacts">focus stones</a>, <a href="/wiki/characters">Xardas</a> pivot, barrier finale</li>
<li>Directional melee at its core — not God of War button chains</li>
<li>Kai Rosenkranz score re-recorded; many original voice actors back where contracts allowed</li>
<li>German dub still treated as the reference language for lip sync</li>
</ul>
<figure class="guide-figure"><img src="/images/guides/guides01-01.webp" alt="Remake journal and paper map without waypoint markers" width="800" height="450" loading="lazy" /><figcaption>Navigation is still diegetic — if an NPC says “old tower,” you walk until you see it.</figcaption></figure>

<h2 id="combat">Combat — awkward start, then you earn the swing</h2>
<p>The 2019 playable teaser used generic hack-and-slash. Fans hated it. Alkimia threw that out and tied animation speed to <a href="/beginner#combat-title">trainer tiers</a> again — same idea as 2001, just readable on a DualSense in 2026.</p>
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
<aside class="guide-callout guide-callout--warning"><strong>Demo reality check</strong><p>Pre-training scavenger packs still delete unprepared players. That is intentional. Pay <a href="/wiki/characters#old-camp-npcs">Scatty</a> before you hero-walk into the valley.</p></aside>
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
<li>Chromatin / <a href="/wiki/quests#chapter-1">Stranger</a> chain still exists — still book-hunting without waypoints</li>
</ul>
<aside class="guide-callout guide-callout--tip"><strong>Veteran grudge point</strong><p>Professions are the biggest cut. If you lived for the brewer loop, you will feel it. If you only remember the main plot and camp join quests, you gain content instead.</p></aside>
<figure class="guide-figure"><img src="/images/guides/guides01-03.webp" alt="Swamp Camp novices on a ritual quest in the Remake" width="800" height="450" loading="lazy" /><figcaption>Swamp and New Camp routes pick up much of the slack from removed professions.</figcaption></figure>

<h2 id="systems">Gear, resistances, and crafting</h2>
<p><a href="/wiki/armors">Armor</a> is not just a flat armor number anymore. <a href="/wiki/weapons">Weapons</a> and cooking got more granular than the 2001 inventory spreadsheet.</p>
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
<li>New players: treat it as the “definitive” hard RPG version — start with our <a href="/beginner">Beginner page</a>, not this rant</li>
<li>2001 veterans: replay for camp routes you skipped and orc lines you never saw</li>
<li>Speedrunners: assume pacing gates differ — old chapter breaks may not match</li>
</ul>
<aside class="guide-callout guide-callout--tip"><strong>After launch</strong><p>Ship values for XP and ore prices may differ slightly from Gothic 1 spreadsheets. We patch guides from player reports, not press releases.</p></aside>
`.trim(),
  },

  {
    id: 2,
    title: "Gothic 1 Remake — Colony Survival Guide: 10 Essential Tips for Beginners",
    description: "The *Gothic 1 Remake* is a brutally unyielding RPG that actively rejects modern hand-holding. If you dive into the Valley of Mines expecting automatic map markers, forgiving combat, or frequent auto-saves, the colony will chew you up within twenty minutes. Based on hours of testing, here is a pragmatic breakdown of the game's core systems and how to secure a massive advantage in your opening hours.",
    tags: ["Gothic 1 Remake"],
    publishDate: "2026-06-08",
    imageUrl: "/images/guides/guides02.webp",
    imageAlt: "Gothic 1 Remake — Colony Survival Guide: 10 Essential Tips for Beginners",
    seo: {
      title: "Gothic 1 Remake — Ultimate Beginner's Guide &amp; Early Survival Tactics",
      description: "A comprehensive beginner's guide for the Gothic 1 Remake. Learn directional combat basics, how to leverage early escort NPCs for XP, grab free gear, and survive the Valley of Mines.",
      keywords: "Gothic Remake guide, Gothic 1 Remake beginner tips, Gothic Remake combat, Gothic Remake free armor, Gothic Remake map location, Gothic Remake learning points"
    },
    addressBar: "gothic-1-remake-ultimate-beginners-guide",
    detailsHtml: `<p>By: Frontline Pathfinder | Lead Content Tester, GameguideHub 
  </p>
  <p> Tested on Build: Playable Demo/Early Remake Build | Data Status: Hand-Verified
  </p>
  <p>The *Gothic 1 Remake* is a brutally unyielding RPG that actively rejects modern hand-holding. If you dive into the Valley of Mines expecting automatic map markers, forgiving combat, or frequent auto-saves, the colony will chew you up within twenty minutes. Based on hours of testing, here is a pragmatic breakdown of the game's core systems and how to secure a massive advantage in your opening hours.
  </p>
  <h2>1. Combat Basics: <a href="/guides/remake-vs-original#combat">Directional Attacks</a> 
  </h2>
  <p>Gothic's combat is highly rigid, deliberate, and directional. Blindly spamming buttons will only result in swift death. Early on, before you level up your weapon proficiency, you cannot link attacks into smooth combinations. Instead, you must master the four raw directional strikes:
  </p>
  <ol>
  <li>Left Click: Triggers a standard front-hand swing.
  </li>
  <li>Right Click: Triggers a back-hand swing.
  </li>
  <li>Q Key: Triggers an upward uppercut.
  </li>
  <li>E Key: Triggers a downward chop.
  </li>
  </ol>
  <p>Defensively, you can dodge by tapping Alt, or raise your weapon to block by holding down Control.
  </p>
  <p>Survival Warning: In the opening hours, limit your engagements to Molerats and <a href="/wiki/bestiary">Scavengers</a>. More aggressive predators like Wolves and Bloodflies will easily bypass your basic defense; missing a single dodge window against them usually means getting one-shot.
  </p>
  <p><img src="/images/guides/guides02-01.webp" alt="Gothic 1 Remake — Colony Survival Guide: 10 Essential Tips for Beginners" width="50%">
  </p>
  <h2>2. Learning Points &amp; Essential Skills 
  </h2>
  <p>Unlike modern RPGs where you spend points directly in an on-screen skill menu, the Gothic Remake preserves the original's gritty training system. When you level up, you earn **<a href="/wiki/other#attributes">Learning Points (LP)</a>**. These points are useless until you locate and pay a physical trainer out in the world to teach you a specific skill (e.g., Bow mastery, lockpicking, strength training).
  </p>
  <p>The Glossary Hack: The remake features a highly useful "Glossary" tab in your journal. This automatically logs every NPC you meet, detailing their exact faction, current location, and whether they serve as a Merchant, Faction Leader, or Skill Teacher. Always refer back to this to find trainers quickly.
  </p>
  <h2>3. Follow Your Guides: The Escort XP Loop 
  </h2>
  <p>The easiest way to secure safe, massive XP early on is to exploit the escort pathing of major NPCs. Do not try to clear the paths yourself. Instead, use these three escort sequences before formally aligning with a faction:
  </p>
  <ol>
  <li>Diego: After the opening sequence, exhaust his dialogue and accept his offer to guide you to the Old Camp. Stay close; he will kill every beast in your path, and *you* will reap the experience points.
  </li>
  <li>Mordrag: Once inside the Old Camp, seek out Thorus (the heavily armored guard guarding the castle gate). Exhaust his dialogue regarding the New Camp to trigger a quest to remove Mordrag (the New Camp liaison). Speak to Mordrag, tell him Thorus wants him gone, and agree to let him guide you to the New Camp. He will clear out hordes of Scavengers and Bloodflies on the way.
  </li>
  <li>Baal Parvez: Find Parvez in the Old Camp. Convince him you are interested in joining the "<a href="/wiki/gods">Sleeper</a>" sect. He will safely escort you through dangerous swampland straight to the Swamp Camp, butchering high-level monsters on the route.
  </li>
  </ol>
  <h2>4. The Three Factions: Keep Your Options Open 
  </h2>
  <p>There are three competing political groups in the valley: the <a href="/factions-builds">Old Camp (ore barons), the New Camp (mercenaries aiming to blow up the barrier), and the Swamp Camp (herbalists worshipping a sleeping deity)</a>. You are not locked into a decision early on. Run quests, collect rewards, and train with teachers in all three camps simultaneously to maximize your early progression before the joining window permanently closes.
  </p>
  <h2>5. Get a Map Early 
  </h2>
  <p>The game provides no minimap, compass, or compass markers on your screen. Navigation is entirely visual. To stay oriented, you must obtain a physical map as soon as you reach the Old Camp.
  </p>
  <p>Find an NPC named Graham near the market stalls. He sells maps of both the overall Colony and the Old Camp. Since you start with zero Ore (the game's currency), hunt basic Scavengers, loot junk, and sell the raw claws and skins to merchants until you have enough ore to buy the <a href="/interactive-map">Map of the Colony</a>.
  </p>
  <p><img src="/images/guides/guides02-02.webp" alt="Gothic 1 Remake — map" width="50%">
  </p>
  <h2>6. Quick &amp; Easy Weapons: Old Sword &amp; Short Bow 
  </h2>
  <p>Do not start your journey weaponless. You can grab a reliable melee weapon and a ranged weapon before even setting foot in the Old Camp:
  </p>
  <ol>
  <li>The <a href="/wiki/weapons">Old Sword</a>: Right after your starting conversation with Diego, walk down the mountain path toward the Valley of Mines. Keep your eyes peeled for a corpse hanging from a tree. Directly beneath this body lies an Old Sword. It has low base damage, but it's vastly superior to your bare hands.
  </li>
  <li>The <a href="/wiki/weapons">Short Bow</a>: Continue down the path until you spot a skeleton slumped against a rock face. Pick up the Hunter's Knife next to it. Inspect the knife in your inventory to see the name "Drax" carved into the hilt. When you reach the bottom of the path, talk to the hunter named **Drax**. Return his knife, and he will give you a **Short Bow** for free. Ranged weapons are incredibly powerful early on, allowing you to pull single targets safely from distance.
  </li>
  </ol>
  <h2>7. Free Armor: The <a href="/wiki/armors">Digger's Dress</a>
  </h2>
  <p>Armor in Gothic is typically locked behind faction membership and is incredibly expensive. However, you can secure your first protective set for free without joining any camp:
  </p>
  <ol>
  <li>Travel to the **New Camp**, and head past the back of the settlement along the lake's left edge.
  </li>
  <li>Follow the winding mountain trail into the cave tunnel to reach the **Free Mine**.
  </li>
  <li>Locate **Swiney** (the chief digger supervisor). Speak to him, and select the dialogue options stating that you are interested in becoming a mine digger. He will hand you a free **Digger's Dress**, boosting your defense against edge, blunt, and fire attacks.
  </li>
  </ol>
  <h2>8. Sleep &amp; Cooked Food 
  </h2>
  <p><a href="/wiki/potions">Potions</a> are rare and should be reserved strictly for healing mid-combat. For out-of-combat recovery, rely on food and rest:
  </p>
  <ol>
  <li>Campfire Cooking: Never eat raw meat. Head to any active campfire with a pan and cook your raw meat. Cooked meat restores significantly more health per unit.
  </li>
  <li>Your Free Bed: Once you establish yourself in the Old Camp, you are assigned a small, personal hut located near the upper ring of the fighting arena. Sleeping here restores your Health and Mana completely for free.
  </li>
  </ol>
  <p>Trespassing Warning: Do not sleep in any bed marked in Red text. That denotes ownership; if an NPC catches you sleeping in their bed, they will immediately draw their weapons and beat you down.
  </p>
  <h2>9. Using Quicksave Effectively
  </h2>
  <p>This remake stays true to its old-school roots by omitting generous modern auto-save intervals. If you die to a pack of wolves, you risk losing hours of unsaved progress.
  </p>
  <p>Get into the habit of pressing F5 to quicksave before entering unexplored ruins, before any fight, and even mid-exploration. Furthermore, you can use quicksaves to safely test dialogue branches with hostile NPCs, or reload if you break too many <a href="/tools/lockpick">lockpicks</a> on a stubborn chest.
  </p>`.trim(),
  },

  {
    id: 3,
    title: "Gothic 1 Remake — Step-by-Step Magic Initiation &amp; Spellsword Progression Guide",
    description: "Starting as a magic user in the *Gothic 1 Remake* is highly challenging. You begin the game with zero mana, zero spells, and no defensive armor. To help you bypass the tedious trial-and-error phases, we have mapped out the exact quest steps, currency values, and hidden progression loops required to unlock your first active spell rune and build a powerful early-game Spellsword.",
    tags: ["Gothic 1 Remake "],
    publishDate: "2026-06-08",
    imageUrl: "/images/guides/guides03.webp",
    imageAlt: "gothic-1-remake-mage-spellsword-guide",
    seo: {
      title: "Gothic 1 Remake — Complete Mage &amp; Spellsword Build Guide",
      description: "A comprehensive, hand-verified guide to becoming a Mage or Spellsword in the Gothic 1 Remake. Step-by-step quest walkthroughs, essential exploits, and common traps explained.",
      keywords: "Gothic Remake magic guide, Gothic Remake mage build, Torrez Price of Magic, Gothic Remake firebolt rune, Lurker's Bite location, Gothic Remake free strength trainer, Gothic Remake performance fix"
    },
    addressBar: "gothic-1-remake-mage-spellsword-guide",
    detailsHtml: `<p>By: Frontline Pathfinder | Lead Content Tester, GameguideHub 
  </p>
  <p> Tested on Build: Live Remake Build | Data Status: Hand-Verified
  </p>
  <p>Starting as a magic user in the *Gothic 1 Remake* is highly challenging. You begin the game with zero mana, zero spells, and no defensive armor. To help you bypass the tedious trial-and-error phases, we have mapped out the exact quest steps, currency values, and hidden progression loops required to unlock your first active <a href="/wiki/runes">spell rune</a> and build a powerful early-game Spellsword.
  </p>
  <p>The Ultimate Progress Trap: Do Not Read the Fire Mage Letter!During the introduction, you receive a letter addressed to the High Mages of Fire. Do not read or open this letter in your inventory! Opening it breaks the questline. If you deliver an opened letter, the Fire Mage Torrez will refuse to teach you magic or trade with you for the rest of the game. If you open it by mistake, you must reload a prior save to preserve your Old Camp magic progression.
  </p>
  <p><img src="/images/guides/guides03-01.webp" alt=" the Fire Mage Letter" width="50%">
  </p>
  <h2>Phase 1: Unlocking Your First Rune — "The Price of Magic"a
  </h2>
  <p>Your magic journey begins at the **Old Camp**. To become a Novice Magician, you need to complete two intertwined quests in a specific sequence to optimize your starting currency (Ore Nuggets) and Experience Points (XP).
  </p>
  <h3>Step 1: The Fisk/Whistler Negotiation (Fast 200 XP)
  </h3>
  <p>Before speaking to Torrez, locate Whistler sitting on the upper ring. He will offer you his quest, "Whistler's Sword," and hand you 100 Ore Nuggets to purchase his weapon from Fisk.
  </p>
  <ol>
  <li>Go to Fisk down in the market. Fisk will inform you that the price of the sword has increased to 110 nuggets.
  </li>
  <li>Select the "Maybe later" dialogue option. Do not pay out of your own pocket.
  </li>
  <li>Return to Whistler and explain that Fisk raised the price. Whistler will grumble but hand you the extra 10 Ore Nuggets.
  </li>
  <li>Buy the sword from Fisk, return it to Whistler, and collect your 200 XP. This step ensures you do not get short-changed on starting funds.
  </li>
  </ol>
  <h3>Step 2: Starting Torrez's Quest
  </h3>
  <p>Now, head to the well in the center of the Old Camp and speak to the Mage, Torrez. Select the "Offer me the magic" dialogue option to start "The Price of Magic". Torrez requires two materials to craft your first rune: 2x Wolf's Claws and 1x Parchment Paper.
  </p>
  <h3>Step 3: Sourcing the Materials
  </h3>
  <p>You do not need to fight wolves for these claws. You can buy them directly, but you need to raise funds first:
  </p>
  <ol>
  <li>Collect any rusted junk, pickaxes, feathers, and beer from the starting path.
  </li>
  <li>Go to Mordrag (the New Camp liaison sitting near the outer gate). Select "Show me the goods."
  </li>
  <li>Sell your scavenged junk to Mordrag to raise 16 Ore Nuggets. Use these funds to purchase 2x <a href="/wiki/trophies">Wolf's Claws</a> from his inventory.
  </li>
  <li>Next, follow the upper path to <a href="/interactive-map">Graham</a> (the map maker). Buy 1x Parchment Paper from him for 13 Ore Nuggets.
  </li>
  <li>Return to Torrez, deliver the items, and spend 5 <a href="/wiki/other">Learning Points</a> (LP) to learn Rune Magic. Select the <a href="/wiki/runes#notable-runes">Firebolt Rune</a> over the Healing Rune (since you can easily restore health for free using cooked meat or beds).
  </li>
  </ol>
  <p><img src="/images/guides/guides03-02.webp" alt="Rune Magic" width="50%">
  </p>
  <h2>Phase 2: Transitioning to the <a href="/factions-builds#builds-title">Spellsword Build</a>
  </h2>
  <p>A "Spellsword" (or Battlemage) in Gothic does not cast spells directly through a weapon; you must physically toggle between your sword and active runes. To make this hybrid playstyle viable, you need high-damage melee gear and free stat upgrades.
  </p>
  <h3>The <a href="/guides/gothic-1-remake-ultimate-beginners-guide">Mordrag Escort Loop</a> (Free XP &amp; Loot)
  </h3>
  <p>Do not walk to the New Camp alone. Speak to Thorus at the Old Camp castle gate and exhaust his dialogue regarding the New Camp to start "Out of Sight". This tasks you with getting rid of Mordrag.
  </p>
  <p>Speak to Mordrag, tell him Thorus wants him gone, and agree to let him guide you to the New Camp. Mordrag is a powerhouse; stay behind him as he clears out all <a href="/wiki/bestiary">Scavengers</a>, Goblins, and Bloodflies along the canyon. You receive 100% of the combat XP for his kills. Loot the fallen Goblins to collect free Rusty Swords for selling or backup usage.
  </p>
  <p>The Cavalorn's Key &amp; Ring Exploit:During Mordrag's escort path, you will pass **Cavalorn's Hut**. 
  </p>
  <p> 1. Sneak (crawl) into his hut while he is patrolling outside. Open his desk chest to steal Cavalorn's Key. 
  </p>
  <p> 2. Walk to the small cave located directly adjacent to his hut. Defeat the two Molerats guarding the cave entrance using your new Firebolt spell. 
  </p>
  <p> 3. Use Cavalorn's Key on the locked door inside the cave. Inside, you will find a stash of arrows, an axe, torches, and a chest containing: 
  </p>
  <p> - Ring of Wooden Skin: Boosts blunt defense by +5. 
  </p>
  <p> - Ring of Life: Permanently boosts Max Health by +30. 
  </p>
  <p> This allows you to obtain top-tier survival accessories for free, saving you from purchasing them from <a href="/wiki/characters">Cronos</a> later.
  </p>
  <h3>Securing "<a href="/wiki/weapons">Lurker's Bite</a>" (21 DMG Early Sword)
  </h3>
  <p>Once you arrive at the **New Camp**, head to the central lake. Swim across to the small cavern alcove on the far side. Inside this cave, you will find a skeleton and a chest containing Lurker's Bite. 
  </p>
  <p> This weapon deals 21 base damage and requires 15 Strength to wield. It is arguably the best early-game hybrid melee option available.
  </p>
  <p>The Free Strength Training Trick:You do not need to spend your hard-earned Ore on Diego to increase your Strength stat. Once you enter the New Camp, seek out one of the rice farmers (Lefty's group) working the fields. By talking to him and running his basic chore task, you can gain Strength training entirely for free. 
  </p>
  <p> Warning: Do not anger or attack this specific farmer, or he will permanently refuse to interact with you, forcing you to pay Diego for Strength upgrades instead.
  </p>
  <h2>Phase 3: Deep Customization &amp; Economy Warning
  </h2>
  <p>Once your Spellsword base is set, locate Cronos inside the New Camp (standing inside the blue glowing crystal cage). He serves as your primary magic merchant and teaches Mana upgrades (+1 Max Mana per 1 LP, or +5 Max Mana per 5 LP).
  </p>
  <p>The Hunting Skill Trap: Do Not Invest Early!Many players assume learning hunting skills (gutting, skinning) is highly profitable for a Mage build. Through our testing, we confirmed this is a major resource trap in the Remake: 
  </p>
  <p><br>
  
  </p>
  <p> - Hunting skills now cost an absurd 175 to 250 Ore Nuggets to learn. 
  </p>
  <p> - Early beast trophies (claws, teeth) only sell for 3 to 5 Ore. 
  </p>
  <p> - The Remake's new trade limits dictate that merchants will quickly stop paying you after you sell them 3 to 5 items of the same type, dropping their buy value to 0 Ore. Save your LP and Ore; stick to selling raw cooked meat and basic weapons instead.
  </p>
  <h2>Colony Exploits: For True Gothic Veterans
  </h2>
  <p>If you want to stretch the limits of <a href="/quests-story">Chapter 1</a>, utilize these two hand-verified community exploits:
  </p>
  <ol>
  <li>The Shipwreck Longsword (40 DMG): Head to the shipwreck waters near the outer barrier boundaries. Dive into the deep underwater cave structures; tucked away inside is a hidden chest containing a 40 Damage Longsword accessible in the very first chapter.
  </li>
  <li>The Templar Aggro Cheese: Locate a high-level Minecrawler near the guard patrols of the Swamp Camp / Old Mine entrance. Aggro the Minecrawler and lure it directly into the Templar guards. Stand back while the beast downs the guards. Once the guards are knocked unconscious, you can safely loot their bodies to secure one of the strongest two-handed weapons in the early game without incurring any crime penalties.
  </li>
  </ol>
  <h2>Performance &amp; Stability Optimization
  </h2>
  <p>If you are experiencing low frame rates or frequent crashes on modern setups:
  </p>
  <ol>
  <li>Our testing with a 3080 / 4080 Super showed that setting "Wind/Ambient Foliage Physics" to Low stabilizes frame rates significantly.
  </li>
  <li>Set DLSS to Quality at 1440p to maintain a solid 70–80 FPS. Using DLSS Ultra-Quality or forcing extreme shadow rendering on some hardware profiles causes instant crashes during zone transitions.
  </li>
  </ol>`,
  }
]
