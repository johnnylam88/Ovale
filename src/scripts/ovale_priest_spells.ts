import { OvaleScriptsClass } from "../engine/scripts";

export function registerPriestSpells(scripts: OvaleScriptsClass) {
    const name = "ovale_priest_spells";
    const desc = "[9.1] Ovale: Priest spells";
    // THIS PART OF THIS FILE IS AUTOMATICALLY GENERATED
    let code = `Define(ancestral_call 274738)
# Invoke the spirits of your ancestors, granting you a random secondary stat for 15 seconds.
  SpellInfo(ancestral_call cd=120 duration=15 gcd=0 offgcd=1)
Define(arcane_torrent 25046)
# Remove s1 beneficial effect from all enemies within A1 yards and restore m2 Energy.
  SpellInfo(arcane_torrent cd=120 gcd=1 energy=-15)
Define(ascended_blast 325283)
# Blasts the enemy with pure Anima, causing (179 of Spell Power) Arcane damage and healing a nearby ally for s2 of the damage done.rnrnGrants s3 lstack:stacks; of Boon of the Ascended.
  SpellInfo(ascended_blast cd=3 gcd=1)
Define(ascended_nova 325020)
# Release a powerful burst of anima, dealing up to (74 of Spell Power) Arcane damage, based on the number of enemies, and (24 of Spell Power) healing to up to 325041s2 allies within A1 yds.rnrnGrants s3 lstack:stacks; of Boon of the Ascended for each target damaged.
  SpellInfo(ascended_nova gcd=1)
Define(bag_of_tricks 312411)
# Pull your chosen trick from the bag and use it on target enemy or ally. Enemies take <damage> damage, while allies are healed for <healing>. 
  SpellInfo(bag_of_tricks cd=90)
Define(berserking 26297)
# Increases your haste by s1 for 12 seconds.
  SpellInfo(berserking cd=180 duration=12 gcd=0 offgcd=1)
  # Haste increased by s1.
  SpellAddBuff(berserking berserking add=1)
Define(blood_fury_int 33702)
# Increases your Intellect by s1 for 15 seconds.
  SpellInfo(blood_fury_int cd=120 duration=15 gcd=0 offgcd=1)
  # Intellect increased by w1.
  SpellAddBuff(blood_fury_int blood_fury_int add=1)
Define(bloodlust 2825)
# Increases haste by (25 of Spell Power) for all party and raid members for 40 seconds.rnrnAllies receiving this effect will become Sated and unable to benefit from Bloodlust or Time Warp again for 600 seconds.
  SpellInfo(bloodlust cd=300 duration=40 gcd=0 offgcd=1)
  # Haste increased by w1.
  SpellAddBuff(bloodlust bloodlust add=1)
Define(boon_of_the_ascended 325013)
# Draw upon the power of the Ascended for 10 seconds, granting you access to @spellname325020, replacing ?c3[@spellname15407][@spellname585] with @spellname325283, and increasing movement speed by s3.rnrnUpon expiration, releases an @spellname325326:rnrnExplode for up to (210 of Spell Power) Arcane damage to enemies and (159 of Spell Power) healing to allies within A1 yds, based on number of targets. Damage and healing increased by 325013s5 for each stack of Boon of the Ascended. 
  SpellInfo(boon_of_the_ascended cd=180 duration=10 max_stacks=99)
  # Empowered to cast @spellname325020 and @spellname325283. Damage and healing of Ascended Eruption increased by w5.
  SpellAddBuff(boon_of_the_ascended boon_of_the_ascended add=1)
Define(damnation 341374)
# Instantly afflicts the target with Shadow Word: Pain, Vampiric Touch and Devouring Plague.
  SpellInfo(damnation cd=45)
  SpellRequire(damnation unusable set=1 enabled=(not hastalent(damnation_talent)))
Define(dark_thought_buff 341207)
# For each damage over time effects on the target, your Mind Flay and Mind Sear have a m1 chance to trigger a Dark Thought. rnrnDark ThoughtrnIncreases the number of charges of Mind Blast by 1, Mind Blast has no cooldown and can be cast instantly, and can be cast while channelling Mind Flay or Mind Sear.
  SpellInfo(dark_thought_buff duration=10 max_stacks=1 gcd=0 offgcd=1)
  # Maximum number of charges of Mind Blast increased by w1.rnrnMind Blast no longer has a  cooldown, can be cast instantly, and while channelling Mind Flay or Mind Sear.
  SpellAddBuff(dark_thought_buff dark_thought_buff add=1)
Define(desperate_prayer 19236)
# Increases maximum health by s1 for 10 seconds, and instantly heals you for that amount.
  SpellInfo(desperate_prayer cd=90 duration=10 gcd=0 offgcd=1 tick=1)
  # Maximum health increased by w1.
  SpellAddBuff(desperate_prayer desperate_prayer add=1)
Define(devouring_plague 335467)
# Afflicts the target with a disease that instantly causes (49.036 of Spell Power) Shadow damage plus an additional o2 Shadow damage over 6 seconds. Heals you for e2*100 of damage dealt.rnrnIf this effect is reapplied, any remaining damage will be added to the new Devouring Plague.
  SpellInfo(devouring_plague insanity=50 duration=6 tick=3)
  # Suffering w2 damage every t2 sec.
  SpellAddTargetDebuff(devouring_plague devouring_plague add=1)
Define(divine_star 110744)
# Throw a Divine Star forward 24 yds, healing allies in its path for (70 of Spell Power) and dealing (56.00000000000001 of Spell Power) Holy damage to enemies. After reaching its destination, the Divine Star returns to you, healing allies and damaging enemies in its path again. Healing reduced beyond s1 targets.
  SpellInfo(divine_star cd=15 duration=15)
  SpellRequire(divine_star unusable set=1 enabled=(not hastalent(divine_star_talent)))
Define(fae_guardians 327661)
# Call forth three faerie guardians to attend your targets for 20 seconds.rnrn@spellname342132: Any direct attacks against the target restore 327703s1/100.1 Mana or 327703s2/100 Insanity. Follows your Shadow Word: Pain.rnrn@spellname327694: Reduces damage taken by 327694s1. Follows your Power Word: Shield.rnrn@spellname327710: Increases the cooldown recovery rate of your target's major ability by 327710s1. Follows your ?c2[Flash Heal][Shadow Mend].
  SpellInfo(fae_guardians cd=90 duration=20 max_stacks=1)
  # Commanding faerie guardians.
  SpellAddBuff(fae_guardians fae_guardians add=1)
Define(fireblood 265221)
# Removes all poison, disease, curse, magic, and bleed effects and increases your ?a162700[Agility]?a162702[Strength]?a162697[Agility]?a162698[Strength]?a162699[Intellect]?a162701[Intellect][primary stat] by 265226s1*3 and an additional 265226s1 for each effect removed. Lasts 8 seconds. ?s195710[This effect shares a 30 sec cooldown with other similar effects.][]
  SpellInfo(fireblood cd=120 gcd=0 offgcd=1)
Define(fleshcraft 324631)
# Form a shield of flesh and bone over 3 seconds that absorbs damage equal to s1 of your maximum health for 120 seconds.rnrnWhile channeling, your damage taken is reduced by s2.rnrn|cFFFFFFFFPassive:|r Moving near an enemy's corpse consumes their essence to reduce Fleshcraft's cooldown by <cdr> sec.
  SpellInfo(fleshcraft cd=120 duration=3 channel=3 tick=0.5)
  # Damage taken reduced by w2.
  SpellAddBuff(fleshcraft fleshcraft add=1)
  # Immune to crowd control effects.rnHealing s17 health every t17 sec.
  SpellAddBuff(fleshcraft ultimate_form_buff add=1)
Define(halo 120517)
# Creates a ring of Holy energy around you that quickly expands to a 30 yd radius, healing allies for (114.99999999999999 of Spell Power) and dealing (103 of Spell Power) Holy damage to enemies. Healing reduced beyond s1 targets.rn
  SpellInfo(halo cd=40 duration=2.15)
  SpellRequire(halo unusable set=1 enabled=(not hastalent(halo_talent)))
Define(holy_fire 14914)
# Consumes the enemy in Holy flames that cause (150 of Spell Power) Holy damage and an additional o2 Holy damage over 7 seconds.?a231687[ Stacks up to u times.][]
  SpellInfo(holy_fire cd=10 duration=7 max_stacks=1 tick=1)
  # w2 Holy damage every t2 seconds.
  SpellAddTargetDebuff(holy_fire holy_fire add=1)
Define(holy_nova 132157)
# An explosion of holy light around you deals up to (18 of Spell Power) Holy damage to enemies and up to (18 of Spell Power) healing to allies within A1 yds, reduced if there are more than s3 targets.rnrn?s322112[If your Holy Nova deals damage to at least m1 enemies, a second Holy Nova will be cast a moment later at m2 effectiveness at the same location.][]
  SpellInfo(holy_nova)
Define(hungering_void_debuff 345219)
# Void Bolt causes the target to become vulnerable to the void, increasing their damage taken from you by 345219m2 for 6 seconds. This effect may only be active on one target at a time.rnrnCasting Void Bolt on an enemy that is already vulnerable extends the duration of your Voidform by m3 sec, or m4 sec if Void Bolt critically strikes.
  SpellInfo(hungering_void_debuff duration=6 gcd=0 offgcd=1)
  # Damage taken from the Priest increased by w1.
  SpellAddTargetDebuff(hungering_void_debuff hungering_void_debuff add=1)
Define(lights_judgment 255647)
# Call down a strike of Holy energy, dealing <damage> Holy damage to enemies within A1 yards after 3 sec.
  SpellInfo(lights_judgment cd=150)
Define(mind_blast 8092)
# Blasts the target's mind for (97.92 of Spell Power) Shadow damage?s231682[, preventing the next <shield> damage they deal][].?a185916[rnrn|cFFFFFFFFGenerates /100;s2 Insanity.|r][]
  SpellInfo(mind_blast cd=15 insanity=0)
  SpellRequire(mind_blast replaced_by set=holy_fire enabled=(specialization("holy")))
Define(mind_bomb 205369)
# Inflicts the target with a Mind Bomb.rnrnAfter 2 seconds or if the target dies, it unleashes a psychic explosion, disorienting all enemies within 226943A1 yds of the target for 6 seconds.
  SpellInfo(mind_bomb cd=30 duration=2)
  SpellRequire(mind_bomb unusable set=1 enabled=(not hastalent(mind_bomb_talent)))
  # About to unleash a psychic explosion, disorienting all nearby enemies.
  SpellAddTargetDebuff(mind_bomb mind_bomb add=1)
Define(mind_flay 15407)
# Assaults the target's mind with Shadow energy, causing o1 Shadow damage over 4.5 seconds and slowing their movement speed by s2.?a185916[rnrn|cFFFFFFFFGenerates s4*s3/100 Insanity over the duration.|r][]
  SpellInfo(mind_flay duration=4.5 channel=4.5 tick=0.75)
  # Movement speed slowed by s2 and taking Shadow damage every t1 sec.
  SpellAddBuff(mind_flay mind_flay add=1)
  # Movement speed slowed by s2 and taking Shadow damage every t1 sec.
  SpellAddTargetDebuff(mind_flay mind_flay add=1)
Define(mind_sear 48045)
# Corrosive shadow energy radiates from the target, dealing (12.6 of Spell Power)*s2 Shadow damage over 4.5 seconds to all enemies within 49821a2 yards of the target.?s137033[rnrn|cFFFFFFFFGenerates s2*208232s1/100 Insanity over the duration per target hit.|r][]
  SpellInfo(mind_sear duration=4.5 channel=4.5 tick=0.75)
  # Causing Shadow damage to all targets within 49821a2 yards every t1 sec.
  SpellAddBuff(mind_sear mind_sear add=1)
  # Causing shadow damage to all targets within a2 yards.
  SpellAddTargetDebuff(mind_sear mind_sear_unused_0 add=1)
Define(mind_sear_unused_0 49821)
# Corrosive shadow energy radiates from the target, dealing (12.6 of Spell Power)*s2 Shadow damage over 4.5 seconds to all enemies within 49821a2 yards of the target.?s137033[rnrn|cFFFFFFFFGenerates s2*208232s1/100 Insanity over the duration per target hit.|r][]
  SpellInfo(mind_sear_unused_0 gcd=0 offgcd=1)
Define(mindbender 123040)
# Summons a Mindbender to attack the target for 12 seconds. You regenerate 123051m1/100.1 of maximum mana each time the Mindbender attacks.
  SpellInfo(mindbender cd=60 duration=12)
  SpellRequire(mindbender unusable set=1 enabled=(not hastalent(mindbender_talent)))
Define(mindbender_shadow 200174)
# Summons a Mindbender to attack the target for 15 seconds.rnrn|cFFFFFFFFGenerates 200010s1/100 Insanity each time the Mindbender attacks.|r
  SpellInfo(mindbender_shadow cd=60 duration=15)
  SpellRequire(mindbender_shadow unusable set=1 enabled=(not hastalent(mindbender_talent_shadow)))
Define(mindgames 323673)
# Assault an enemy's mind, dealing (300 of Spell Power)*m3/100 Shadow damage and briefly reversing their perception of reality.rnrn?c3[For 5 seconds, the next <damage> damage they deal will heal their target, and the next <healing> healing they deal will damage their target.rnrn|cFFFFFFFFReversed damage and healing generate up to 323706s2*2 Insanity.|r]rn][For 5 seconds, the next <damage> damage they deal will heal their target, and the next <healing> healing they deal will damage their target.rnrn|cFFFFFFFFReversed damage and healing restore up to 323706s3*2 mana.|r]
  SpellInfo(mindgames cd=45 duration=5)
  # The next w2 damage and w5 healing dealt will be reversed.
  SpellAddTargetDebuff(mindgames mindgames add=1)
Define(penance 47540)
# Launches a volley of holy light at the target, causing ?s193134[(40 of Spell Power)*4][(40 of Spell Power)*3] Holy damage to an enemy or ?s193134[(125 of Spell Power)*4][(125 of Spell Power)*3] healing to an ally over 2 seconds. Castable while moving.
  SpellInfo(penance cd=9 channel=0)
Define(power_infusion 10060)
# Infuses the target with power for 20 seconds, increasing haste by (25 of Spell Power).
  SpellInfo(power_infusion cd=120 duration=20 gcd=0 offgcd=1)
  # Haste increased by w1.
  SpellAddBuff(power_infusion power_infusion add=1)
Define(power_word_solace 129250)
# Strikes an enemy with heavenly power, dealing (80 of Spell Power) Holy damage and restoring <mana> of your maximum mana.
  SpellInfo(power_word_solace cd=15)
  SpellRequire(power_word_solace unusable set=1 enabled=(not hastalent(power_word_solace_talent)))
Define(purge_the_wicked 204197)
# Cleanses the target with fire, causing (22.3 of Spell Power) Fire damage and an additional 204213o1 Fire damage over 20 seconds. Spreads to an additional nearby enemy when you cast Penance on the target.
  SpellInfo(purge_the_wicked)
  SpellRequire(purge_the_wicked unusable set=1 enabled=(not hastalent(purge_the_wicked_talent)))
  # w1 Fire damage every t1 seconds.
  SpellAddTargetDebuff(purge_the_wicked purge_the_wicked_debuff add=1)
Define(purge_the_wicked_debuff 204213)
# Cleanses the target with fire, causing (22.3 of Spell Power) Fire damage and an additional 204213o1 Fire damage over 20 seconds. Spreads to an additional nearby enemy when you cast Penance on the target.
  SpellInfo(purge_the_wicked_debuff duration=20 gcd=0 offgcd=1 tick=2)
Define(quaking_palm 107079)
# Strikes the target with lightning speed, incapacitating them for 4 seconds, and turns off your attack.
  SpellInfo(quaking_palm cd=120 duration=4 gcd=1)
  # Incapacitated.
  SpellAddTargetDebuff(quaking_palm quaking_palm add=1)
Define(schism 214621)
# Attack the enemy's soul with a surge of Shadow energy, dealing (150 of Spell Power) Shadow damage and increasing your spell damage to the target by s2 for 9 seconds.
  SpellInfo(schism cd=24 duration=9)
  SpellRequire(schism unusable set=1 enabled=(not hastalent(schism_talent)))
  # Taking s2 increased damage from the Priest.
  SpellAddTargetDebuff(schism schism add=1)
Define(searing_nightmare 341385)
# Instantly deals (43 of Spell Power) Shadow damage to enemies around the target and afflicts them with Shadow Word: Pain. If the enemy is already afflicted by your Shadow Word: Pain, Searing Nightmare's damage is increased by m1.rnrnOnly usable while channeling Mind Sear.
  SpellInfo(searing_nightmare insanity=30)
  SpellRequire(searing_nightmare unusable set=1 enabled=(not hastalent(searing_nightmare_talent)))
Define(shadow_covenant 314867)
# Make a shadowy pact, healing the target and s3-1 other injured allies within A2 yds for (165 of Spell Power). For 7 seconds, your Shadow spells deal 322105m2 increased damage and healing, but you cannot cast Holy spells.
  SpellInfo(shadow_covenant cd=30)
  SpellRequire(shadow_covenant unusable set=1 enabled=(not hastalent(shadow_covenant_talent)))
  # Shadow spells deal w2 increased damage and healing, but cannot cast Holy spells.
  SpellAddBuff(shadow_covenant shadow_covenant_buff add=1)
Define(shadow_covenant_buff 322105)
# Make a shadowy pact, healing the target and s3-1 other injured allies within A2 yds for (165 of Spell Power). For 7 seconds, your Shadow spells deal 322105m2 increased damage and healing, but you cannot cast Holy spells.
  SpellInfo(shadow_covenant_buff duration=7 gcd=0 offgcd=1)
Define(shadow_crash 205385)
# Hurl a bolt of slow-moving Shadow energy at the destination, dealing (153 of Spell Power) Shadow damage to all targets within 205386A1 yards.rnrn|cFFFFFFFFGenerates /100;s2 Insanity.|r
  SpellInfo(shadow_crash cd=30 insanity=-15)
  SpellRequire(shadow_crash unusable set=1 enabled=(not hastalent(shadow_crash_talent)))
Define(shadow_word_death 32379)
# A word of dark binding that inflicts (85 of Spell Power) Shadow damage to the target. If the target is not killed by Shadow Word: Death, the caster takes damage equal to the damage inflicted upon the target.rnrnDamage increased by s3 to targets below s2 health.?c3[][]?s81749[rnrnDoes not trigger Atonement.][]
  SpellInfo(shadow_word_death cd=30)
Define(shadow_word_pain 589)
# A word of darkness that causes (12.920000000000002 of Spell Power) Shadow damage instantly, and an additional o2 Shadow damage over 12 seconds.?a185916[rnrn|cFFFFFFFFGenerates m3/100 Insanity.|r][]
  SpellInfo(shadow_word_pain duration=12 insanity=-4 tick=2)
  SpellRequire(shadow_word_pain replaced_by set=purge_the_wicked enabled=(hastalent(purge_the_wicked_talent)))
  # Suffering w2 Shadow damage every t2 sec.
  SpellAddTargetDebuff(shadow_word_pain shadow_word_pain add=1)
Define(shadowfiend 34433)
# Summons a shadowy fiend to attack the target for 15 seconds.?s319904[rnrn|cFFFFFFFFGenerates 262485s1/100 Insanity each time the Shadowfiend attacks.|r][]?s343726[rnrn|cFFFFFFFFGenerates 343726s1 Mana each time the Shadowfiend attacks.|r][]
  SpellInfo(shadowfiend cd=180 duration=15)
  SpellRequire(shadowfiend replaced_by set=mindbender_shadow enabled=(hastalent(mindbender_talent_shadow)))
  SpellRequire(shadowfiend replaced_by set=mindbender enabled=(hastalent(mindbender_talent)))
  # 343726
  SpellAddBuff(shadowfiend shadowfiend add=1)
Define(shadowform 232698)
# Assume a Shadowform, increasing your spell damage dealt by s1.
  SpellInfo(shadowform)
  # Spell damage dealt increased by s1.
  SpellAddBuff(shadowform shadowform add=1)
Define(silence 15487)
# Silences the target, preventing them from casting spells for 4 seconds. Against non-players, also interrupts spellcasting and prevents any spell in that school from being cast for 4 seconds.
  SpellInfo(silence cd=45 duration=4 gcd=0 offgcd=1)
  # Silenced.
  SpellAddTargetDebuff(silence silence add=1)
Define(smite 585)
# Smites an enemy for (47 of Spell Power) Holy damage?s231687[ and has a 231687s1 chance to reset the cooldown of Holy Fire][].
  SpellInfo(smite)
  SpellRequire(smite replaced_by set=mind_flay enabled=(specialization("shadow")))
Define(spirit_shell 109964)
# For 10 seconds, Penance, Power Word: Radiance, and Atonement create absorb shields for s1 of their value, instead of healing.
  SpellInfo(spirit_shell cd=90 duration=10 gcd=0 offgcd=1)
  SpellRequire(spirit_shell unusable set=1 enabled=(not hastalent(spirit_shell_talent)))
  # Penance, Power Word: Radiance, and Atonement create absorb shields for w1 of their healing.
  SpellAddBuff(spirit_shell spirit_shell add=1)
Define(surrender_to_madness 319952)
# Deals (64.60000000000001 of Spell Power)*2 Shadow damage to the target and activates Voidform.rnrnFor the next 30 seconds, your Insanity-generating abilities generate s2 more Insanity and you can cast while moving.rnrnIf the target does not die within 30 seconds of using Surrender to Madness, you die.
  SpellInfo(surrender_to_madness cd=90 duration=30)
  SpellRequire(surrender_to_madness unusable set=1 enabled=(not hastalent(surrender_to_madness_talent)))
  # The Priest has surrendered to madness, sharing its fate with its target. If the target doesn't die within d, the Priest dies.rnrnCan cast while moving, and  Insanity-generating abilities generate w2 more Insanity.
  SpellAddBuff(surrender_to_madness surrender_to_madness add=1)
  # Mind Blast has an additional charge.rn?s193225[Spell damage dealt increased by w16.][Spell damage dealt increased by w1.]rn?s341240[Critical strike chance increased by w4.][]?s193225[ Losing w3/500 Insanity every sec.][]
  SpellAddBuff(surrender_to_madness voidform_buff add=1)
  # The Priest has surrendered to madness, sharing its fate with its target. If the target doesn't die within d, the Priest dies.rnrnCan cast while moving, and  Insanity-generating abilities generate w2 more Insanity.
  SpellAddTargetDebuff(surrender_to_madness surrender_to_madness add=1)
Define(ultimate_form_buff 323524)
# While channeling Fleshcraft, you are immune to crowd control and you regenerate 323524s17 health every 323524t17 sec. rnrnIf you finish the full channel, you gain 3 seconds of crowd control immunity, during which you regenerate 323524s17 health every 323524t17 sec.
  SpellInfo(ultimate_form_buff duration=3 gcd=0 offgcd=1 tick=1)
Define(unfurling_darkness_buff 341282)
# After casting Vampiric Touch on a target, your next Vampiric Touch within 8 seconds is instant cast and deals (105.4 of Spell Power) Shadow damage immediately.rnrnThis effect cannot occur more than once every 15 seconds.
  SpellInfo(unfurling_darkness_buff duration=8 gcd=0 offgcd=1)
Define(unholy_nova 324724)
# An explosion of dark energy infects enemies within 325203A1 yds with Unholy Transfusion, and heals allies for up to (150 of Spell Power) based on number of targets.rnrn|TInterfaceICONSSpell_AnimaMaldraxxus_Debuff.blp:24|t |cFFFFFFFFUnholy Tranfusion|rrnDeals up to o1 Shadow damage based on number of targets over 15 seconds. Allies who damage this target are healed for (4 of Spell Power)*<mult>.
  SpellInfo(unholy_nova cd=60)
  # Attackers siphon 325118s1 health.
  SpellAddBuff(unholy_nova unholy_nova add=1)
  # Suffering w1 damage every t1 sec. When damaged, the attacker is healed for 325118m1.
  SpellAddTargetDebuff(unholy_nova unholy_transfusion add=1)
Define(unholy_transfusion 325203)
# Deals up to o1 Shadow damage based on number of targets over 15 seconds. Allies who damage this target are healed for (4 of Spell Power)*<mult>.
  SpellInfo(unholy_transfusion cd=60 duration=15 tick=3)
Define(vampiric_touch 34914)
# A touch of darkness that causes 34914o2 Shadow damage over 21 seconds, and heals you for e2*100 of damage dealt.rn?s322116[rnIf Vampiric Touch is dispelled, the dispeller flees in Horror for 3 seconds.rn][]rn|cFFFFFFFFGenerates m3/100 Insanity.|r
  SpellInfo(vampiric_touch duration=21 insanity=-5 tick=3)
  # Suffering w2 Shadow damage every t2 sec.
  SpellAddTargetDebuff(vampiric_touch vampiric_touch add=1)
Define(void_bolt 205448)
# Sends a bolt of pure void energy at the enemy, causing (81.6 of Spell Power) Shadow damage?s193225[, refreshing the duration of Devouring Plague on the target][]?a231688[ and extending the duration of Shadow Word: Pain and Vampiric Touch on all nearby targets by <ext> sec][]. rnrnRequires Voidform.rnrn|cFFFFFFFFGenerates /100;s3 Insanity.|r
  SpellInfo(void_bolt cd=4.5 insanity=-12)
Define(void_eruption 228260)
# Releases an explosive blast of pure void energy, activating Voidform and causing (64.60000000000001 of Spell Power)*2 Shadow damage to all enemies within a1 yds of your target.rnrnDuring Voidform, this ability is replaced by Void Bolt.
  SpellInfo(void_eruption cd=90)
Define(void_torrent 263165)
# Channel a torrent of void energy into the target, dealing o Shadow damage over 3 seconds.rnrn|cFFFFFFFFGenerates 289577s1*289577s2/100 Insanity over the duration.|r
  SpellInfo(void_torrent cd=30 duration=3 channel=3 tick=1)
  SpellRequire(void_torrent unusable set=1 enabled=(not hastalent(void_torrent_talent)))
  # Dealing s1 Shadow damage to the target every t1 sec.
  SpellAddBuff(void_torrent void_torrent add=1)
  # |cFFFFFFFFGenerates s1*s2/100 Insanity over d.|r
  SpellAddBuff(void_torrent void_torrent_unused_2 add=1)
  # Dealing s1 Shadow damage to the target every t1 sec.
  SpellAddTargetDebuff(void_torrent void_torrent add=1)
Define(void_torrent_unused_2 289577)
# Channel a torrent of void energy into the target, dealing o Shadow damage over 3 seconds.rnrn|cFFFFFFFFGenerates 289577s1*289577s2/100 Insanity over the duration.|r
  SpellInfo(void_torrent_unused_2 duration=3.9 gcd=0 offgcd=1 tick=0.975)
Define(voidform_buff 194249)
# Activated by casting Void Eruption. Twists your Shadowform with the powers of the Void, increasing spell damage you deal by 194249s1?s8092[, granting an additional charge of Mind Blast, and refreshing Mind Blast's cooldown.][.]rnrn?a193225[Your Insanity will drain increasingly fast until it reaches 0 and Voidform ends.][Lasts 15 seconds.]
  SpellInfo(voidform_buff cd=90 duration=15 gcd=0 offgcd=1 tick=1)
Define(volatile_solvent_humanoid_buff 323491)
# Fleshcraft's passive effect consumes a corpse's essence completely, granting a benefit based on the creature's type. rnrnCasting Fleshcraft also consumes a small portion of your own essence, granting you the Humanoid benefit.
  SpellInfo(volatile_solvent_humanoid_buff duration=120 gcd=0 offgcd=1)
  # Mastery increased by m1.
  SpellAddBuff(volatile_solvent_humanoid_buff volatile_solvent_humanoid_buff add=1)
Define(war_stomp 20549)
# Stuns up to i enemies within A1 yds for 2 seconds.
  SpellInfo(war_stomp cd=90 duration=2 gcd=0 offgcd=1)
  # Stunned.
  SpellAddTargetDebuff(war_stomp war_stomp add=1)
Define(wrathful_faerie_debuff 342132)
# Call forth three faerie guardians to attend your targets for 20 seconds.rnrn@spellname342132: Any direct attacks against the target restore 327703s1/100.1 Mana or 327703s2/100 Insanity. Follows your Shadow Word: Pain.rnrn@spellname327694: Reduces damage taken by 327694s1. Follows your Power Word: Shield.rnrn@spellname327710: Increases the cooldown recovery rate of your target's major ability by 327710s1. Follows your ?c2[Flash Heal][Shadow Mend].rn
  SpellInfo(wrathful_faerie_debuff duration=20 gcd=0 offgcd=1)
  # Direct damage on this target restores 327703s1/100.1 Mana or 327703s2/100 Insanity to @auracaster.rnrnFollows @auracaster's Shadow Word: Pain.
  SpellAddTargetDebuff(wrathful_faerie_debuff wrathful_faerie_debuff add=1)
Define(damnation_talent 21718)
# Instantly afflicts the target with Shadow Word: Pain, Vampiric Touch and Devouring Plague.
Define(divine_star_talent 19760)
# Throw a Divine Star forward 24 yds, healing allies in its path for (70 of Spell Power) and dealing (56.00000000000001 of Spell Power) Holy damage to enemies. After reaching its destination, the Divine Star returns to you, healing allies and damaging enemies in its path again. Healing reduced beyond s1 targets.
Define(halo_talent 19763)
# Creates a ring of Holy energy around you that quickly expands to a 30 yd radius, healing allies for (114.99999999999999 of Spell Power) and dealing (103 of Spell Power) Holy damage to enemies. Healing reduced beyond s1 targets.rn
Define(hungering_void_talent 21978)
# Void Bolt causes the target to become vulnerable to the void, increasing their damage taken from you by 345219m2 for 6 seconds. This effect may only be active on one target at a time.rnrnCasting Void Bolt on an enemy that is already vulnerable extends the duration of your Voidform by m3 sec, or m4 sec if Void Bolt critically strikes.
Define(mind_bomb_talent 23375)
# Inflicts the target with a Mind Bomb.rnrnAfter 2 seconds or if the target dies, it unleashes a psychic explosion, disorienting all enemies within 226943A1 yds of the target for 6 seconds.
Define(mindbender_talent_shadow 21719)
# Summons a Mindbender to attack the target for 15 seconds.rnrn|cFFFFFFFFGenerates 200010s1/100 Insanity each time the Mindbender attacks.|r
Define(mindbender_talent 22094)
# Summons a Mindbender to attack the target for 12 seconds. You regenerate 123051m1/100.1 of maximum mana each time the Mindbender attacks.
Define(misery_talent 23126)
# Vampiric Touch also applies Shadow Word: Pain to the target.
Define(power_word_solace_talent 19755)
# Strikes an enemy with heavenly power, dealing (80 of Spell Power) Holy damage and restoring <mana> of your maximum mana.
Define(psychic_link_talent 22311)
# ?s205351[Shadow Word: Void][Mind Blast] deals s1 of its damage to all other targets afflicted by your Vampiric Touch within 199486A2 yards.
Define(purge_the_wicked_talent 22161)
# Cleanses the target with fire, causing (22.3 of Spell Power) Fire damage and an additional 204213o1 Fire damage over 20 seconds. Spreads to an additional nearby enemy when you cast Penance on the target.
Define(schism_talent 22329)
# Attack the enemy's soul with a surge of Shadow energy, dealing (150 of Spell Power) Shadow damage and increasing your spell damage to the target by s2 for 9 seconds.
Define(searing_nightmare_talent 23127)
# Instantly deals (43 of Spell Power) Shadow damage to enemies around the target and afflicts them with Shadow Word: Pain. If the enemy is already afflicted by your Shadow Word: Pain, Searing Nightmare's damage is increased by m1.rnrnOnly usable while channeling Mind Sear.
Define(shadow_covenant_talent 19766)
# Make a shadowy pact, healing the target and s3-1 other injured allies within A2 yds for (165 of Spell Power). For 7 seconds, your Shadow spells deal 322105m2 increased damage and healing, but you cannot cast Holy spells.
Define(shadow_crash_talent 21755)
# Hurl a bolt of slow-moving Shadow energy at the destination, dealing (153 of Spell Power) Shadow damage to all targets within 205386A1 yards.rnrn|cFFFFFFFFGenerates /100;s2 Insanity.|r
Define(spirit_shell_talent 21184)
# For 10 seconds, Penance, Power Word: Radiance, and Atonement create absorb shields for s1 of their value, instead of healing.
Define(surrender_to_madness_talent 21979)
# Deals (64.60000000000001 of Spell Power)*2 Shadow damage to the target and activates Voidform.rnrnFor the next 30 seconds, your Insanity-generating abilities generate s2 more Insanity and you can cast while moving.rnrnIf the target does not die within 30 seconds of using Surrender to Madness, you die.
Define(twist_of_fate_talent_shadow 23125)
# After damaging a target below s1 health, you gain 123254s2 increased damage and healing for 8 seconds.
Define(void_torrent_talent 21720)
# Channel a torrent of void energy into the target, dealing o Shadow damage over 3 seconds.rnrn|cFFFFFFFFGenerates 289577s1*289577s2/100 Insanity over the duration.|r
Define(potion_of_spectral_intellect_item 171273)
    ItemInfo(potion_of_spectral_intellect_item cd=1 shared_cd="item_cd_4" proc=307162)
Define(darkmoon_deck_putrescence_item 173069)
    ItemInfo(darkmoon_deck_putrescence_item cd=90 proc=333885)
Define(dreadfire_vessel_item 184030)
    ItemInfo(dreadfire_vessel_item cd=90 proc=349857)
Define(empyreal_ordnance_item 180117)
    ItemInfo(empyreal_ordnance_item cd=180 proc=345543)
Define(glyph_of_assimilation_item 184021)
    ItemInfo(glyph_of_assimilation_item cd=90 proc=345500)
Define(inscrutable_quantum_device_item 179350)
    ItemInfo(inscrutable_quantum_device_item cd=180 proc=348098)
Define(macabre_sheet_music_item 184024)
    ItemInfo(macabre_sheet_music_item cd=90 proc=345431)
Define(shadowed_orb_of_torment_item 186428)
    ItemInfo(shadowed_orb_of_torment_item cd=120 proc=356334)
Define(sinful_gladiators_badge_of_ferocity_item 175921)
    ItemInfo(sinful_gladiators_badge_of_ferocity_item cd=60 proc=345228)
Define(soulletting_ruby_item 178809)
    ItemInfo(soulletting_ruby_item cd=120 proc=345807)
Define(sunblood_amethyst_item 178826)
    ItemInfo(sunblood_amethyst_item cd=90 proc=343397)
Define(painbreaker_psalm_runeforge 6981)
Define(sephuzs_proclamation_runeforge 7103)
Define(shadowflame_prism_runeforge 6982)
Define(spheres_harmony_runeforge 7728)
Define(talbadars_stratagem_runeforge 7162)
Define(dissonant_echoes_conduit 115)
Define(field_of_blossoms_soulbind 319191)
Define(grove_invigoration_soulbind 322721)
Define(pustule_eruption_soulbind 351094)
Define(volatile_solvent_soulbind 323074)
    `;
    // END

    code += `
SpellRequire(void_bolt unusable set=1 enabled=(not buffpresent(voidform_buff)))
SpellAddTargetDebuff(vampiric_touch shadow_word_pain add=1 enabled=(talent(misery_talent)))
SpellAddBuff(void_eruption voidform_buff add=1)
  `;

    scripts.registerScript("PRIEST", undefined, name, desc, code, "include");
}
