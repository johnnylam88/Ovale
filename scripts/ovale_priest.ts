import __addon from "addon";
let [OVALE, Ovale] = __addon;
import { OvaleScripts } from "./OvaleScripts";
{
    let name = "icyveins_priest_discipline";
    let desc = "[7.1.5] Icy-Veins: Priest Discipline";
    let code = `
	
Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_priest_spells)

AddFunction DisciplineDefaultHealActions
{
	Spell(power_word_shield)
	if SpellCount(plea) < 6 Spell(plea)
	Spell(shadow_mend)
}

AddFunction DisciplineDefaultMainActions
{
	if (target.DebuffExpires(schism_debuff))
	{
		if not Talent(purge_the_wicked_talent) and target.DebuffRefreshable(shadow_word_pain_debuff) and target.TimeToDie() > target.DebuffRemaining(shadow_word_pain_debuff) Spell(shadow_word_pain)
		if Talent(purge_the_wicked_talent) and target.DebuffRefreshable(purge_the_wicked_debuff) and target.TimeToDie() > target.DebuffRemaining(purge_the_wicked_debuff) Spell(purge_the_wicked)
	}
	if target.TimeToDie() >= 6 Spell(schism)
	if (not Talent(schism_talent) or not target.DebuffExpires(schism_debuff)) Spell(penance)
	if (not Talent(schism_talent) or not target.DebuffExpires(schism_debuff)) Spell(power_word_solace)
	if target.Distance() <= 30 Spell(divine_star)
	Spell(smite)
}

AddFunction DisciplineDefaultCdActions
{
	if (not Talent(schism_talent) or not target.DebuffExpires(schism_debuff)) Spell(lights_wrath)
	if Talent(mindbender_talent) Spell(mindbender)
	Spell(power_infusion)
	Item(Trinket0Slot usable=1 text=13)
	Item(Trinket1Slot usable=1 text=14)
	Spell(shadowfiend)
	Spell(rapture)
}
	
AddIcon help=mainheal specialization=discipline
{
	DisciplineDefaultHealActions()
}

AddIcon enemies=1 help=main specialization=discipline
{
	DisciplineDefaultMainActions()
}

AddIcon help=cd specialization=discipline
{
	DisciplineDefaultCdActions()
}

	`;
    OvaleScripts.RegisterScript("PRIEST", "discipline", name, desc, code, "script");
}
{
    let name = "simulationcraft_priest_shadow_t19p";
    let desc = "[7.0] SimulationCraft: Priest_Shadow_T19P";
    let code = `
# Based on SimulationCraft profile "Priest_Shadow_T19P".
#	class=priest
#	spec=shadow
#	talents=1211231

Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_priest_spells)


AddFunction s2mcheck_value
{
	0.8 * { 83 + { 20 + 20 * TalentPoints(fortress_of_the_mind_talent) } * ArmorSetBonus(T20 4) - 5 * TalentPoints(sanlayn_talent) + { 33 - 13 * ArmorSetBonus(T20 4) } * TalentPoints(reaper_of_souls_talent) + ArmorSetBonus(T19 2) * 4 + 8 * HasEquippedItem(mangazas_madness) + SpellHaste() * 10 * { 1 + 0.7 * ArmorSetBonus(T20 4) } * { 2 + 0.8 * ArmorSetBonus(T19 2) + 1 * TalentPoints(reaper_of_souls_talent) + 2 * ArtifactTraitRank(mass_hysteria) - 1 * TalentPoints(sanlayn_talent) } } - actors_fight_time_mod() * 0
}

AddFunction s2mcheck
{
	if s2mcheck_value() > s2mcheck_min() s2mcheck_value()
	s2mcheck_min()
}

AddFunction actors_fight_time_mod
{
	if TimeInCombat() + target.TimeToDie() <= 450 { 450 - { TimeInCombat() + target.TimeToDie() } } / 5
	if TimeInCombat() + target.TimeToDie() > 450 and TimeInCombat() + target.TimeToDie() < 600 -{ { -450 + TimeInCombat() + target.TimeToDie() } / 10 }
	0
}

AddFunction s2mcheck_min
{
	180
}

AddCheckBox(opt_interrupt L(interrupt) default specialization=shadow)
AddCheckBox(opt_use_consumables L(opt_use_consumables) default specialization=shadow)

AddFunction ShadowInterruptActions
{
	if CheckBoxOn(opt_interrupt) and not target.IsFriend() and target.Casting()
	{
		if target.InRange(silence) and target.IsInterruptible() Spell(silence)
		if target.InRange(mind_bomb) and not target.Classification(worldboss) and target.RemainingCastTime() > 2 Spell(mind_bomb)
		if target.Distance(less 8) and target.IsInterruptible() Spell(arcane_torrent_mana)
		if target.InRange(quaking_palm) and not target.Classification(worldboss) Spell(quaking_palm)
		if target.Distance(less 5) and not target.Classification(worldboss) Spell(war_stomp)
	}
}

AddFunction ShadowUseItemActions
{
	Item(Trinket0Slot text=13 usable=1)
	Item(Trinket1Slot text=14 usable=1)
}

### actions.default

AddFunction ShadowDefaultMainActions
{
	#call_action_list,name=check,if=talent.surrender_to_madness.enabled&!buff.surrender_to_madness.up
	if Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) ShadowCheckMainActions()

	unless Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckMainPostConditions()
	{
		#run_action_list,name=s2m,if=buff.voidform.up&buff.surrender_to_madness.up
		if BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) ShadowS2mMainActions()

		unless BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mMainPostConditions()
		{
			#run_action_list,name=vf,if=buff.voidform.up
			if BuffPresent(voidform_buff) ShadowVfMainActions()

			unless BuffPresent(voidform_buff) and ShadowVfMainPostConditions()
			{
				#run_action_list,name=main
				ShadowMainMainActions()
			}
		}
	}
}

AddFunction ShadowDefaultMainPostConditions
{
	Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckMainPostConditions() or BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mMainPostConditions() or BuffPresent(voidform_buff) and ShadowVfMainPostConditions() or ShadowMainMainPostConditions()
}

AddFunction ShadowDefaultShortCdActions
{
	#call_action_list,name=check,if=talent.surrender_to_madness.enabled&!buff.surrender_to_madness.up
	if Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) ShadowCheckShortCdActions()

	unless Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckShortCdPostConditions()
	{
		#run_action_list,name=s2m,if=buff.voidform.up&buff.surrender_to_madness.up
		if BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) ShadowS2mShortCdActions()

		unless BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mShortCdPostConditions()
		{
			#run_action_list,name=vf,if=buff.voidform.up
			if BuffPresent(voidform_buff) ShadowVfShortCdActions()

			unless BuffPresent(voidform_buff) and ShadowVfShortCdPostConditions()
			{
				#run_action_list,name=main
				ShadowMainShortCdActions()
			}
		}
	}
}

AddFunction ShadowDefaultShortCdPostConditions
{
	Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckShortCdPostConditions() or BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mShortCdPostConditions() or BuffPresent(voidform_buff) and ShadowVfShortCdPostConditions() or ShadowMainShortCdPostConditions()
}

AddFunction ShadowDefaultCdActions
{
	#silence
	ShadowInterruptActions()
	#use_items,if=buff.voidform.up
	if BuffPresent(voidform_buff) ShadowUseItemActions()
	#potion,name=prolonged_power,if=buff.bloodlust.react|target.time_to_die<=80|(target.health.pct<35&cooldown.power_infusion.remains<30)
	if { BuffPresent(burst_haste_buff any=1) or target.TimeToDie() <= 80 or target.HealthPercent() < 35 and SpellCooldown(power_infusion) < 30 } and CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(prolonged_power_potion usable=1)
	#call_action_list,name=check,if=talent.surrender_to_madness.enabled&!buff.surrender_to_madness.up
	if Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) ShadowCheckCdActions()

	unless Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckCdPostConditions()
	{
		#run_action_list,name=s2m,if=buff.voidform.up&buff.surrender_to_madness.up
		if BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) ShadowS2mCdActions()

		unless BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mCdPostConditions()
		{
			#run_action_list,name=vf,if=buff.voidform.up
			if BuffPresent(voidform_buff) ShadowVfCdActions()

			unless BuffPresent(voidform_buff) and ShadowVfCdPostConditions()
			{
				#run_action_list,name=main
				ShadowMainCdActions()
			}
		}
	}
}

AddFunction ShadowDefaultCdPostConditions
{
	Talent(surrender_to_madness_talent) and not BuffPresent(surrender_to_madness_buff) and ShadowCheckCdPostConditions() or BuffPresent(voidform_buff) and BuffPresent(surrender_to_madness_buff) and ShadowS2mCdPostConditions() or BuffPresent(voidform_buff) and ShadowVfCdPostConditions() or ShadowMainCdPostConditions()
}

### actions.check

AddFunction ShadowCheckMainActions
{
}

AddFunction ShadowCheckMainPostConditions
{
}

AddFunction ShadowCheckShortCdActions
{
}

AddFunction ShadowCheckShortCdPostConditions
{
}

AddFunction ShadowCheckCdActions
{
}

AddFunction ShadowCheckCdPostConditions
{
}

### actions.main

AddFunction ShadowMainMainActions
{
	#shadow_word_pain,if=talent.misery.enabled&dot.shadow_word_pain.remains<gcd.max,moving=1,cycle_targets=1
	if Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() Spell(shadow_word_pain)
	#vampiric_touch,if=talent.misery.enabled&(dot.vampiric_touch.remains<3*gcd.max|dot.shadow_word_pain.remains<3*gcd.max),cycle_targets=1
	if Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } Spell(vampiric_touch)
	#shadow_word_pain,if=!talent.misery.enabled&dot.shadow_word_pain.remains<(3+(4%3))*gcd
	if not Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < { 3 + 4 / 3 } * GCD() Spell(shadow_word_pain)
	#vampiric_touch,if=!talent.misery.enabled&dot.vampiric_touch.remains<(4+(4%3))*gcd
	if not Talent(misery_talent) and target.DebuffRemaining(vampiric_touch_debuff) < { 4 + 4 / 3 } * GCD() Spell(vampiric_touch)
	#void_eruption
	Spell(void_eruption)
	#shadow_word_death,if=(active_enemies<=4|(talent.reaper_of_souls.enabled&active_enemies<=2))&cooldown.shadow_word_death.charges=2&insanity<=(85-15*talent.reaper_of_souls.enabled)
	if { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Insanity() <= 85 - 15 * TalentPoints(reaper_of_souls_talent) Spell(shadow_word_death)
	#mind_blast,if=active_enemies<=4&talent.legacy_of_the_void.enabled&(insanity<=81|(insanity<=75.2&talent.fortress_of_the_mind.enabled))
	if Enemies() <= 4 and Talent(legacy_of_the_void_talent) and { Insanity() <= 81 or Insanity() <= 75.2 and Talent(fortress_of_the_mind_talent) } Spell(mind_blast)
	#mind_blast,if=active_enemies<=4&!talent.legacy_of_the_void.enabled|(insanity<=96|(insanity<=95.2&talent.fortress_of_the_mind.enabled))
	if Enemies() <= 4 and not Talent(legacy_of_the_void_talent) or Insanity() <= 96 or Insanity() <= 95.2 and Talent(fortress_of_the_mind_talent) Spell(mind_blast)
	#shadow_word_pain,if=!talent.misery.enabled&!ticking&target.time_to_die>10&(active_enemies<5&(talent.auspicious_spirits.enabled|talent.shadowy_insight.enabled)),cycle_targets=1
	if not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } Spell(shadow_word_pain)
	#vampiric_touch,if=active_enemies>1&!talent.misery.enabled&!ticking&(85.2*(1+0.2+stat.mastery_rating%16000)*(1+0.2*talent.sanlayn.enabled)*0.5*target.time_to_die%(gcd.max*(138+80*(active_enemies-1))))>1,cycle_targets=1
	if Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 Spell(vampiric_touch)
	#shadow_word_pain,if=active_enemies>1&!talent.misery.enabled&!ticking&(47.12*(1+0.2+stat.mastery_rating%16000)*0.75*target.time_to_die%(gcd.max*(138+80*(active_enemies-1))))>1,cycle_targets=1
	if Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 Spell(shadow_word_pain)
	#shadow_word_void,if=talent.shadow_word_void.enabled&(insanity<=75-10*talent.legacy_of_the_void.enabled)
	if Talent(shadow_word_void_talent) and Insanity() <= 75 - 10 * TalentPoints(legacy_of_the_void_talent) Spell(shadow_word_void)
	#mind_flay,interrupt=1,chain=1
	Spell(mind_flay)
	#shadow_word_pain
	Spell(shadow_word_pain)
}

AddFunction ShadowMainMainPostConditions
{
}

AddFunction ShadowMainShortCdActions
{
	unless Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and Spell(vampiric_touch) or not Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < { 3 + 4 / 3 } * GCD() and Spell(shadow_word_pain) or not Talent(misery_talent) and target.DebuffRemaining(vampiric_touch_debuff) < { 4 + 4 / 3 } * GCD() and Spell(vampiric_touch) or Spell(void_eruption)
	{
		#shadow_crash,if=talent.shadow_crash.enabled
		if Talent(shadow_crash_talent) Spell(shadow_crash)
	}
}

AddFunction ShadowMainShortCdPostConditions
{
	Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and Spell(vampiric_touch) or not Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < { 3 + 4 / 3 } * GCD() and Spell(shadow_word_pain) or not Talent(misery_talent) and target.DebuffRemaining(vampiric_touch_debuff) < { 4 + 4 / 3 } * GCD() and Spell(vampiric_touch) or Spell(void_eruption) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Insanity() <= 85 - 15 * TalentPoints(reaper_of_souls_talent) and Spell(shadow_word_death) or Enemies() <= 4 and Talent(legacy_of_the_void_talent) and { Insanity() <= 81 or Insanity() <= 75.2 and Talent(fortress_of_the_mind_talent) } and Spell(mind_blast) or { Enemies() <= 4 and not Talent(legacy_of_the_void_talent) or Insanity() <= 96 or Insanity() <= 95.2 and Talent(fortress_of_the_mind_talent) } and Spell(mind_blast) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } and Spell(shadow_word_pain) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(shadow_word_pain) or Talent(shadow_word_void_talent) and Insanity() <= 75 - 10 * TalentPoints(legacy_of_the_void_talent) and Spell(shadow_word_void) or Spell(mind_flay) or Spell(shadow_word_pain)
}

AddFunction ShadowMainCdActions
{
	#surrender_to_madness,if=talent.surrender_to_madness.enabled&target.time_to_die<=variable.s2mcheck
	if Talent(surrender_to_madness_talent) and target.TimeToDie() <= s2mcheck() Spell(surrender_to_madness)
}

AddFunction ShadowMainCdPostConditions
{
	Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and Spell(vampiric_touch) or not Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < { 3 + 4 / 3 } * GCD() and Spell(shadow_word_pain) or not Talent(misery_talent) and target.DebuffRemaining(vampiric_touch_debuff) < { 4 + 4 / 3 } * GCD() and Spell(vampiric_touch) or Spell(void_eruption) or Talent(shadow_crash_talent) and Spell(shadow_crash) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Insanity() <= 85 - 15 * TalentPoints(reaper_of_souls_talent) and Spell(shadow_word_death) or Enemies() <= 4 and Talent(legacy_of_the_void_talent) and { Insanity() <= 81 or Insanity() <= 75.2 and Talent(fortress_of_the_mind_talent) } and Spell(mind_blast) or { Enemies() <= 4 and not Talent(legacy_of_the_void_talent) or Insanity() <= 96 or Insanity() <= 95.2 and Talent(fortress_of_the_mind_talent) } and Spell(mind_blast) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } and Spell(shadow_word_pain) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(shadow_word_pain) or Talent(shadow_word_void_talent) and Insanity() <= 75 - 10 * TalentPoints(legacy_of_the_void_talent) and Spell(shadow_word_void) or Spell(mind_flay) or Spell(shadow_word_pain)
}

### actions.precombat

AddFunction ShadowPrecombatMainActions
{
	#shadowform,if=!buff.shadowform.up
	if not BuffPresent(shadowform_buff) Spell(shadowform)
	#mind_blast
	Spell(mind_blast)
}

AddFunction ShadowPrecombatMainPostConditions
{
}

AddFunction ShadowPrecombatShortCdActions
{
}

AddFunction ShadowPrecombatShortCdPostConditions
{
	not BuffPresent(shadowform_buff) and Spell(shadowform) or Spell(mind_blast)
}

AddFunction ShadowPrecombatCdActions
{
	#flask,type=flask_of_the_whispered_pact
	#food,type=azshari_salad
	#augmentation,type=defiled
	#snapshot_stats
	#potion,name=prolonged_power
	if CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(prolonged_power_potion usable=1)
}

AddFunction ShadowPrecombatCdPostConditions
{
	not BuffPresent(shadowform_buff) and Spell(shadowform) or Spell(mind_blast)
}

### actions.s2m

AddFunction ShadowS2mMainActions
{
	#void_bolt,if=buff.insanity_drain_stacks.value<6&set_bonus.tier19_4pc
	if BuffAmount(insanity_drain_stacks_buff) < 6 and ArmorSetBonus(T19 4) Spell(void_bolt)
	#mindbender,if=cooldown.shadow_word_death.charges=0&buff.voidform.stack>(45+25*set_bonus.tier20_4pc)
	if SpellCharges(shadow_word_death) == 0 and BuffStacks(voidform_buff) > 45 + 25 * ArmorSetBonus(T20 4) Spell(mindbender)
	#void_torrent,if=dot.shadow_word_pain.remains>5.5&dot.vampiric_touch.remains>5.5&!buff.power_infusion.up|buff.voidform.stack<5
	if target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and not BuffPresent(power_infusion_buff) or BuffStacks(voidform_buff) < 5 Spell(void_torrent)
	#shadow_word_death,if=current_insanity_drain*gcd.max>insanity&(insanity-(current_insanity_drain*gcd.max)+(30+30*talent.reaper_of_souls.enabled)<100)
	if CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 Spell(shadow_word_death)
	#void_bolt
	Spell(void_bolt)
	#shadow_word_death,if=(active_enemies<=4|(talent.reaper_of_souls.enabled&active_enemies<=2))&current_insanity_drain*gcd.max>insanity&(insanity-(current_insanity_drain*gcd.max)+(30+30*talent.reaper_of_souls.enabled))<100
	if { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 Spell(shadow_word_death)
	#wait,sec=action.void_bolt.usable_in,if=action.void_bolt.usable_in<gcd.max*0.28
	unless SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0
	{
		#mind_blast,if=active_enemies<=5
		if Enemies() <= 5 Spell(mind_blast)
		#wait,sec=action.mind_blast.usable_in,if=action.mind_blast.usable_in<gcd.max*0.28&active_enemies<=5
		unless SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 5 and SpellCooldown(mind_blast) > 0
		{
			#shadow_word_death,if=(active_enemies<=4|(talent.reaper_of_souls.enabled&active_enemies<=2))&cooldown.shadow_word_death.charges=2
			if { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 Spell(shadow_word_death)
			#shadowfiend,if=!talent.mindbender.enabled&buff.voidform.stack>15
			if not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 Spell(shadowfiend)
			#shadow_word_void,if=talent.shadow_word_void.enabled&(insanity-(current_insanity_drain*gcd.max)+50)<100
			if Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 50 < 100 Spell(shadow_word_void)
			#shadow_word_pain,if=talent.misery.enabled&dot.shadow_word_pain.remains<gcd,moving=1,cycle_targets=1
			if Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() Spell(shadow_word_pain)
			#vampiric_touch,if=talent.misery.enabled&(dot.vampiric_touch.remains<3*gcd.max|dot.shadow_word_pain.remains<3*gcd.max),cycle_targets=1
			if Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } Spell(vampiric_touch)
			#shadow_word_pain,if=!talent.misery.enabled&!ticking&(active_enemies<5|talent.auspicious_spirits.enabled|talent.shadowy_insight.enabled|artifact.sphere_of_insanity.rank)
			if not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } Spell(shadow_word_pain)
			#vampiric_touch,if=!talent.misery.enabled&!ticking&(active_enemies<4|talent.sanlayn.enabled|(talent.auspicious_spirits.enabled&artifact.unleash_the_shadows.rank))
			if not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } Spell(vampiric_touch)
			#shadow_word_pain,if=!talent.misery.enabled&!ticking&target.time_to_die>10&(active_enemies<5&(talent.auspicious_spirits.enabled|talent.shadowy_insight.enabled)),cycle_targets=1
			if not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } Spell(shadow_word_pain)
			#vampiric_touch,if=!talent.misery.enabled&!ticking&target.time_to_die>10&(active_enemies<4|talent.sanlayn.enabled|(talent.auspicious_spirits.enabled&artifact.unleash_the_shadows.rank)),cycle_targets=1
			if not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and target.TimeToDie() > 10 and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } Spell(vampiric_touch)
			#shadow_word_pain,if=!talent.misery.enabled&!ticking&target.time_to_die>10&(active_enemies<5&artifact.sphere_of_insanity.rank),cycle_targets=1
			if not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and ArtifactTraitRank(sphere_of_insanity) Spell(shadow_word_pain)
			#mind_flay,chain=1,interrupt_immediate=1,interrupt_if=ticks>=2&(action.void_bolt.usable|(current_insanity_drain*gcd.max>insanity&(insanity-(current_insanity_drain*gcd.max)+60)<100&cooldown.shadow_word_death.charges>=1))
			Spell(mind_flay)
		}
	}
}

AddFunction ShadowS2mMainPostConditions
{
}

AddFunction ShadowS2mShortCdActions
{
	unless BuffAmount(insanity_drain_stacks_buff) < 6 and ArmorSetBonus(T19 4) and Spell(void_bolt)
	{
		#shadow_crash,if=talent.shadow_crash.enabled
		if Talent(shadow_crash_talent) Spell(shadow_crash)
	}
}

AddFunction ShadowS2mShortCdPostConditions
{
	BuffAmount(insanity_drain_stacks_buff) < 6 and ArmorSetBonus(T19 4) and Spell(void_bolt) or SpellCharges(shadow_word_death) == 0 and BuffStacks(voidform_buff) > 45 + 25 * ArmorSetBonus(T20 4) and Spell(mindbender) or { target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and not BuffPresent(power_infusion_buff) or BuffStacks(voidform_buff) < 5 } and Spell(void_torrent) or CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or Spell(void_bolt) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or not { SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0 } and { Enemies() <= 5 and Spell(mind_blast) or not { SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 5 and SpellCooldown(mind_blast) > 0 } and { { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Spell(shadow_word_death) or not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 and Spell(shadowfiend) or Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 50 < 100 and Spell(shadow_word_void) or Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and target.TimeToDie() > 10 and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and ArtifactTraitRank(sphere_of_insanity) and Spell(shadow_word_pain) or Spell(mind_flay) } }
}

AddFunction ShadowS2mCdActions
{
	unless BuffAmount(insanity_drain_stacks_buff) < 6 and ArmorSetBonus(T19 4) and Spell(void_bolt) or Talent(shadow_crash_talent) and Spell(shadow_crash) or SpellCharges(shadow_word_death) == 0 and BuffStacks(voidform_buff) > 45 + 25 * ArmorSetBonus(T20 4) and Spell(mindbender) or { target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and not BuffPresent(power_infusion_buff) or BuffStacks(voidform_buff) < 5 } and Spell(void_torrent)
	{
		#berserking,if=buff.voidform.stack>=65
		if BuffStacks(voidform_buff) >= 65 Spell(berserking)

		unless CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death)
		{
			#power_infusion,if=cooldown.shadow_word_death.charges=0&buff.voidform.stack>(45+25*set_bonus.tier20_4pc)|target.time_to_die<=30
			if SpellCharges(shadow_word_death) == 0 and BuffStacks(voidform_buff) > 45 + 25 * ArmorSetBonus(T20 4) or target.TimeToDie() <= 30 Spell(power_infusion)

			unless Spell(void_bolt) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death)
			{
				#wait,sec=action.void_bolt.usable_in,if=action.void_bolt.usable_in<gcd.max*0.28
				unless SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0
				{
					#dispersion,if=current_insanity_drain*gcd.max>insanity&!buff.power_infusion.up|(buff.voidform.stack>76&cooldown.shadow_word_death.charges=0&current_insanity_drain*gcd.max>insanity)
					if CurrentInsanityDrain() * GCD() > Insanity() and not BuffPresent(power_infusion_buff) or BuffStacks(voidform_buff) > 76 and SpellCharges(shadow_word_death) == 0 and CurrentInsanityDrain() * GCD() > Insanity() Spell(dispersion)
				}
			}
		}
	}
}

AddFunction ShadowS2mCdPostConditions
{
	BuffAmount(insanity_drain_stacks_buff) < 6 and ArmorSetBonus(T19 4) and Spell(void_bolt) or Talent(shadow_crash_talent) and Spell(shadow_crash) or SpellCharges(shadow_word_death) == 0 and BuffStacks(voidform_buff) > 45 + 25 * ArmorSetBonus(T20 4) and Spell(mindbender) or { target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and not BuffPresent(power_infusion_buff) or BuffStacks(voidform_buff) < 5 } and Spell(void_torrent) or CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or Spell(void_bolt) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 30 + 30 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or not { SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0 } and { Enemies() <= 5 and Spell(mind_blast) or not { SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 5 and SpellCooldown(mind_blast) > 0 } and { { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Spell(shadow_word_death) or not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 and Spell(shadowfiend) or Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 50 < 100 and Spell(shadow_word_void) or Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and { Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and target.TimeToDie() > 10 and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and target.TimeToDie() > 10 and Enemies() < 5 and ArtifactTraitRank(sphere_of_insanity) and Spell(shadow_word_pain) or Spell(mind_flay) } }
}

### actions.vf

AddFunction ShadowVfMainActions
{
	#void_bolt
	Spell(void_bolt)
	#void_torrent,if=dot.shadow_word_pain.remains>5.5&dot.vampiric_touch.remains>5.5&(!talent.surrender_to_madness.enabled|(talent.surrender_to_madness.enabled&target.time_to_die>variable.s2mcheck-(buff.insanity_drain_stacks.value)+60))
	if target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 60 } Spell(void_torrent)
	#mindbender,if=set_bonus.tier20_4pc&buff.insanity_drain_stacks.value>=(21-(3*(raid_event.movement.in<15)*((active_enemies-target.adds)=1))+2*buff.bloodlust.up+2*talent.fortress_of_the_mind.enabled+2*artifact.lash_of_insanity.rank)&(!talent.surrender_to_madness.enabled|(talent.surrender_to_madness.enabled&target.time_to_die>variable.s2mcheck-buff.insanity_drain_stacks.value))
	if ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 21 - 3 * { 600 < 15 } * { Enemies() - { Enemies() - 1 } == 1 } + 2 * BuffPresent(burst_haste_buff any=1) + 2 * TalentPoints(fortress_of_the_mind_talent) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) } Spell(mindbender)
	#mindbender,if=!set_bonus.tier20_4pc&buff.insanity_drain_stacks.value>=(10+2*set_bonus.tier19_2pc+5*buff.bloodlust.up+3*equipped.mangazas_madness+2*artifact.lash_of_insanity.rank)&(!talent.surrender_to_madness.enabled|(talent.surrender_to_madness.enabled&target.time_to_die>variable.s2mcheck-(buff.insanity_drain_stacks.value)+30))
	if not ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 10 + 2 * ArmorSetBonus(T19 2) + 5 * BuffPresent(burst_haste_buff any=1) + 3 * HasEquippedItem(mangazas_madness) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 30 } Spell(mindbender)
	#void_bolt
	Spell(void_bolt)
	#shadow_word_death,if=(active_enemies<=4|(talent.reaper_of_souls.enabled&active_enemies<=2))&current_insanity_drain*gcd.max>insanity&(insanity-(current_insanity_drain*gcd.max)+(15+15*talent.reaper_of_souls.enabled))<100
	if { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 15 + 15 * TalentPoints(reaper_of_souls_talent) < 100 Spell(shadow_word_death)
	#wait,sec=action.void_bolt.usable_in,if=action.void_bolt.usable_in<gcd.max*0.28
	unless SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0
	{
		#mind_blast,if=active_enemies<=4
		if Enemies() <= 4 Spell(mind_blast)
		#wait,sec=action.mind_blast.usable_in,if=action.mind_blast.usable_in<gcd.max*0.28&active_enemies<=4
		unless SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 4 and SpellCooldown(mind_blast) > 0
		{
			#shadow_word_death,if=(active_enemies<=4|(talent.reaper_of_souls.enabled&active_enemies<=2))&cooldown.shadow_word_death.charges=2
			if { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 Spell(shadow_word_death)
			#shadowfiend,if=!talent.mindbender.enabled&buff.voidform.stack>15
			if not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 Spell(shadowfiend)
			#shadow_word_void,if=talent.shadow_word_void.enabled&(insanity-(current_insanity_drain*gcd.max)+25)<100
			if Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 25 < 100 Spell(shadow_word_void)
			#shadow_word_pain,if=talent.misery.enabled&dot.shadow_word_pain.remains<gcd,moving=1,cycle_targets=1
			if Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() Spell(shadow_word_pain)
			#vampiric_touch,if=talent.misery.enabled&(dot.vampiric_touch.remains<3*gcd.max|dot.shadow_word_pain.remains<3*gcd.max)&target.time_to_die>5*gcd.max,cycle_targets=1
			if Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and target.TimeToDie() > 5 * GCD() Spell(vampiric_touch)
			#shadow_word_pain,if=!talent.misery.enabled&!ticking&(active_enemies<5|talent.auspicious_spirits.enabled|talent.shadowy_insight.enabled|artifact.sphere_of_insanity.rank)
			if not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } Spell(shadow_word_pain)
			#vampiric_touch,if=!talent.misery.enabled&!ticking&(active_enemies<4|talent.sanlayn.enabled|(talent.auspicious_spirits.enabled&artifact.unleash_the_shadows.rank))
			if not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } Spell(vampiric_touch)
			#vampiric_touch,if=active_enemies>1&!talent.misery.enabled&!ticking&(85.2*(1+0.02*buff.voidform.stack)*(1+0.2+stat.mastery_rating%16000)*(1+0.2*talent.sanlayn.enabled)*0.5*target.time_to_die%(gcd.max*(138+80*(active_enemies-1))))>1,cycle_targets=1
			if Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 Spell(vampiric_touch)
			#shadow_word_pain,if=active_enemies>1&!talent.misery.enabled&!ticking&(47.12*(1+0.02*buff.voidform.stack)*(1+0.2+stat.mastery_rating%16000)*0.75*target.time_to_die%(gcd.max*(138+80*(active_enemies-1))))>1,cycle_targets=1
			if Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 Spell(shadow_word_pain)
			#mind_flay,chain=1,interrupt_immediate=1,interrupt_if=ticks>=2&(action.void_bolt.usable|(current_insanity_drain*gcd.max>insanity&(insanity-(current_insanity_drain*gcd.max)+30)<100&cooldown.shadow_word_death.charges>=1))
			Spell(mind_flay)
			#shadow_word_pain
			Spell(shadow_word_pain)
		}
	}
}

AddFunction ShadowVfMainPostConditions
{
}

AddFunction ShadowVfShortCdActions
{
	unless Spell(void_bolt)
	{
		#shadow_crash,if=talent.shadow_crash.enabled
		if Talent(shadow_crash_talent) Spell(shadow_crash)
	}
}

AddFunction ShadowVfShortCdPostConditions
{
	Spell(void_bolt) or target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 60 } and Spell(void_torrent) or ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 21 - 3 * { 600 < 15 } * { Enemies() - { Enemies() - 1 } == 1 } + 2 * BuffPresent(burst_haste_buff any=1) + 2 * TalentPoints(fortress_of_the_mind_talent) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) } and Spell(mindbender) or not ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 10 + 2 * ArmorSetBonus(T19 2) + 5 * BuffPresent(burst_haste_buff any=1) + 3 * HasEquippedItem(mangazas_madness) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 30 } and Spell(mindbender) or Spell(void_bolt) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 15 + 15 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or not { SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0 } and { Enemies() <= 4 and Spell(mind_blast) or not { SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 4 and SpellCooldown(mind_blast) > 0 } and { { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Spell(shadow_word_death) or not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 and Spell(shadowfiend) or Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 25 < 100 and Spell(shadow_word_void) or Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and target.TimeToDie() > 5 * GCD() and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(shadow_word_pain) or Spell(mind_flay) or Spell(shadow_word_pain) } }
}

AddFunction ShadowVfCdActions
{
	#surrender_to_madness,if=talent.surrender_to_madness.enabled&insanity>=25&(cooldown.void_bolt.up|cooldown.void_torrent.up|cooldown.shadow_word_death.up|buff.shadowy_insight.up)&target.time_to_die<=variable.s2mcheck-(buff.insanity_drain_stacks.value)
	if Talent(surrender_to_madness_talent) and Insanity() >= 25 and { not SpellCooldown(void_bolt) > 0 or not SpellCooldown(void_torrent) > 0 or not SpellCooldown(shadow_word_death) > 0 or BuffPresent(shadowy_insight_buff) } and target.TimeToDie() <= s2mcheck() - BuffAmount(insanity_drain_stacks_buff) Spell(surrender_to_madness)
	#silence,if=equipped.sephuzs_secret&(target.is_add|target.debuff.casting.react)&cooldown.buff_sephuzs_secret.remains<1&!buff.sephuzs_secret.up&buff.insanity_drain_stacks.value>10,cycle_targets=1
	if HasEquippedItem(sephuzs_secret) and { not target.Classification(worldboss) or target.IsInterruptible() } and BuffCooldown(sephuzs_secret_buff) < 1 and not BuffPresent(sephuzs_secret_buff) and BuffAmount(insanity_drain_stacks_buff) > 10 ShadowInterruptActions()

	unless Spell(void_bolt)
	{
		#mind_bomb,if=equipped.sephuzs_secret&target.is_add&cooldown.buff_sephuzs_secret.remains<1&!buff.sephuzs_secret.up&buff.insanity_drain_stacks.value>10,cycle_targets=1
		if HasEquippedItem(sephuzs_secret) and not target.Classification(worldboss) and BuffCooldown(sephuzs_secret_buff) < 1 and not BuffPresent(sephuzs_secret_buff) and BuffAmount(insanity_drain_stacks_buff) > 10 ShadowInterruptActions()

		unless Talent(shadow_crash_talent) and Spell(shadow_crash) or target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 60 } and Spell(void_torrent) or ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 21 - 3 * { 600 < 15 } * { Enemies() - { Enemies() - 1 } == 1 } + 2 * BuffPresent(burst_haste_buff any=1) + 2 * TalentPoints(fortress_of_the_mind_talent) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) } and Spell(mindbender) or not ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 10 + 2 * ArmorSetBonus(T19 2) + 5 * BuffPresent(burst_haste_buff any=1) + 3 * HasEquippedItem(mangazas_madness) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 30 } and Spell(mindbender)
		{
			#power_infusion,if=buff.insanity_drain_stacks.value>=(10+2*set_bonus.tier19_2pc+5*buff.bloodlust.up*(1+1*set_bonus.tier20_4pc)+3*equipped.mangazas_madness+6*set_bonus.tier20_4pc+2*artifact.lash_of_insanity.rank)&(!talent.surrender_to_madness.enabled|(talent.surrender_to_madness.enabled&target.time_to_die>variable.s2mcheck-(buff.insanity_drain_stacks.value)+61))
			if BuffAmount(insanity_drain_stacks_buff) >= 10 + 2 * ArmorSetBonus(T19 2) + 5 * BuffPresent(burst_haste_buff any=1) * { 1 + 1 * ArmorSetBonus(T20 4) } + 3 * HasEquippedItem(mangazas_madness) + 6 * ArmorSetBonus(T20 4) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 61 } Spell(power_infusion)
			#berserking,if=buff.voidform.stack>=10&buff.insanity_drain_stacks.value<=20&(!talent.surrender_to_madness.enabled|(talent.surrender_to_madness.enabled&target.time_to_die>variable.s2mcheck-(buff.insanity_drain_stacks.value)+60))
			if BuffStacks(voidform_buff) >= 10 and BuffAmount(insanity_drain_stacks_buff) <= 20 and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 60 } Spell(berserking)
		}
	}
}

AddFunction ShadowVfCdPostConditions
{
	Spell(void_bolt) or Talent(shadow_crash_talent) and Spell(shadow_crash) or target.DebuffRemaining(shadow_word_pain_debuff) > 5.5 and target.DebuffRemaining(vampiric_touch_debuff) > 5.5 and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 60 } and Spell(void_torrent) or ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 21 - 3 * { 600 < 15 } * { Enemies() - { Enemies() - 1 } == 1 } + 2 * BuffPresent(burst_haste_buff any=1) + 2 * TalentPoints(fortress_of_the_mind_talent) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) } and Spell(mindbender) or not ArmorSetBonus(T20 4) and BuffAmount(insanity_drain_stacks_buff) >= 10 + 2 * ArmorSetBonus(T19 2) + 5 * BuffPresent(burst_haste_buff any=1) + 3 * HasEquippedItem(mangazas_madness) + 2 * ArtifactTraitRank(lash_of_insanity) and { not Talent(surrender_to_madness_talent) or Talent(surrender_to_madness_talent) and target.TimeToDie() > s2mcheck() - BuffAmount(insanity_drain_stacks_buff) + 30 } and Spell(mindbender) or Spell(void_bolt) or { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and CurrentInsanityDrain() * GCD() > Insanity() and Insanity() - CurrentInsanityDrain() * GCD() + 15 + 15 * TalentPoints(reaper_of_souls_talent) < 100 and Spell(shadow_word_death) or not { SpellCooldown(void_bolt) < GCD() * 0.28 and SpellCooldown(void_bolt) > 0 } and { Enemies() <= 4 and Spell(mind_blast) or not { SpellCooldown(mind_blast) < GCD() * 0.28 and Enemies() <= 4 and SpellCooldown(mind_blast) > 0 } and { { Enemies() <= 4 or Talent(reaper_of_souls_talent) and Enemies() <= 2 } and SpellCharges(shadow_word_death) == 2 and Spell(shadow_word_death) or not Talent(mindbender_talent) and BuffStacks(voidform_buff) > 15 and Spell(shadowfiend) or Talent(shadow_word_void_talent) and Insanity() - CurrentInsanityDrain() * GCD() + 25 < 100 and Spell(shadow_word_void) or Speed() > 0 and Talent(misery_talent) and target.DebuffRemaining(shadow_word_pain_debuff) < GCD() and Spell(shadow_word_pain) or Talent(misery_talent) and { target.DebuffRemaining(vampiric_touch_debuff) < 3 * GCD() or target.DebuffRemaining(shadow_word_pain_debuff) < 3 * GCD() } and target.TimeToDie() > 5 * GCD() and Spell(vampiric_touch) or not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and { Enemies() < 5 or Talent(auspicious_spirits_talent) or Talent(shadowy_insight_talent) or ArtifactTraitRank(sphere_of_insanity) } and Spell(shadow_word_pain) or not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and { Enemies() < 4 or Talent(sanlayn_talent) or Talent(auspicious_spirits_talent) and ArtifactTraitRank(unleash_the_shadows) } and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(vampiric_touch_debuff) and 85.2 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * { 1 + 0.2 * TalentPoints(sanlayn_talent) } * 0.5 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(vampiric_touch) or Enemies() > 1 and not Talent(misery_talent) and not target.DebuffPresent(shadow_word_pain_debuff) and 47.12 * { 1 + 0.02 * BuffStacks(voidform_buff) } * { 1 + 0.2 + MasteryRating() / 16000 } * 0.75 * target.TimeToDie() / { GCD() * { 138 + 80 * { Enemies() - 1 } } } > 1 and Spell(shadow_word_pain) or Spell(mind_flay) or Spell(shadow_word_pain) } }
}

### Shadow icons.

AddCheckBox(opt_priest_shadow_aoe L(AOE) default specialization=shadow)

AddIcon checkbox=!opt_priest_shadow_aoe enemies=1 help=shortcd specialization=shadow
{
	if not InCombat() ShadowPrecombatShortCdActions()
	unless not InCombat() and ShadowPrecombatShortCdPostConditions()
	{
		ShadowDefaultShortCdActions()
	}
}

AddIcon checkbox=opt_priest_shadow_aoe help=shortcd specialization=shadow
{
	if not InCombat() ShadowPrecombatShortCdActions()
	unless not InCombat() and ShadowPrecombatShortCdPostConditions()
	{
		ShadowDefaultShortCdActions()
	}
}

AddIcon enemies=1 help=main specialization=shadow
{
	if not InCombat() ShadowPrecombatMainActions()
	unless not InCombat() and ShadowPrecombatMainPostConditions()
	{
		ShadowDefaultMainActions()
	}
}

AddIcon checkbox=opt_priest_shadow_aoe help=aoe specialization=shadow
{
	if not InCombat() ShadowPrecombatMainActions()
	unless not InCombat() and ShadowPrecombatMainPostConditions()
	{
		ShadowDefaultMainActions()
	}
}

AddIcon checkbox=!opt_priest_shadow_aoe enemies=1 help=cd specialization=shadow
{
	if not InCombat() ShadowPrecombatCdActions()
	unless not InCombat() and ShadowPrecombatCdPostConditions()
	{
		ShadowDefaultCdActions()
	}
}

AddIcon checkbox=opt_priest_shadow_aoe help=cd specialization=shadow
{
	if not InCombat() ShadowPrecombatCdActions()
	unless not InCombat() and ShadowPrecombatCdPostConditions()
	{
		ShadowDefaultCdActions()
	}
}

### Required symbols
# arcane_torrent_mana
# auspicious_spirits_talent
# berserking
# dispersion
# fortress_of_the_mind_talent
# insanity_drain_stacks_buff
# lash_of_insanity
# legacy_of_the_void_talent
# mangazas_madness
# mass_hysteria
# mind_blast
# mind_bomb
# mind_flay
# mindbender
# mindbender_talent
# misery_talent
# power_infusion
# power_infusion_buff
# prolonged_power_potion
# quaking_palm
# reaper_of_souls_talent
# sanlayn_talent
# sephuzs_secret
# sephuzs_secret_buff
# shadow_crash
# shadow_crash_talent
# shadow_word_death
# shadow_word_pain
# shadow_word_pain_debuff
# shadow_word_void
# shadow_word_void_talent
# shadowfiend
# shadowform
# shadowform_buff
# shadowy_insight_buff
# shadowy_insight_talent
# silence
# sphere_of_insanity
# surrender_to_madness
# surrender_to_madness_buff
# surrender_to_madness_talent
# unleash_the_shadows
# vampiric_touch
# vampiric_touch_debuff
# void_bolt
# void_eruption
# void_torrent
# voidform_buff
# war_stomp
`;
    OvaleScripts.RegisterScript("PRIEST", "shadow", name, desc, code, "script");
}
