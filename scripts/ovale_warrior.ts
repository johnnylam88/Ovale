import __addon from "addon";
let [OVALE, Ovale] = __addon;
import { OvaleScripts } from "./OvaleScripts";
{
    let name = "icyveins_warrior_protection";
    let desc = "[7.2.5] Icy-Veins: Warrior Protection";
    let code = `

Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_warrior_spells)

AddCheckBox(opt_interrupt L(interrupt) default specialization=protection)
AddCheckBox(opt_melee_range L(not_in_melee_range) specialization=protection)
AddCheckBox(opt_warrior_protection_aoe L(AOE) default specialization=protection)

AddFunction ProtectionHealMe
{
	if HealthPercent() < 70 Spell(victory_rush)
	if HealthPercent() < 85 Spell(impending_victory)
}

AddFunction ProtectionGetInMeleeRange
{
	if CheckBoxOn(opt_melee_range) and not InFlightToTarget(intercept) and not InFlightToTarget(heroic_leap)
	{
		if target.InRange(intercept) Spell(intercept)
		if SpellCharges(intercept) == 0 and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)
		if not target.InRange(pummel) Texture(misc_arrowlup help=L(not_in_melee_range))
	}
}

AddFunction ProtectionInterruptActions
{
	if CheckBoxOn(opt_interrupt) and not target.IsFriend() and target.Casting()
	{
		if target.InRange(pummel) and target.IsInterruptible() Spell(pummel)
		if target.InRange(storm_bolt) and not target.Classification(worldboss) Spell(storm_bolt)
		if target.InRange(intercept) and not target.Classification(worldboss) and Talent(warbringer_talent) Spell(intercept)
		if target.Distance(less 10) and not target.Classification(worldboss) Spell(shockwave)
		if target.Distance(less 8) and target.IsInterruptible() Spell(arcane_torrent_rage)
		if target.InRange(quaking_palm) and not target.Classification(worldboss) Spell(quaking_palm)
		if target.Distance(less 5) and not target.Classification(worldboss) Spell(war_stomp)
		if target.InRange(intimidating_shout) and not target.Classification(worldboss) Spell(intimidating_shout)
	}
}

AddFunction ProtectionOffensiveCooldowns
{
	Spell(avatar)
	Spell(battle_cry)
	if (Talent(booming_voice_talent) and RageDeficit() >= Talent(booming_voice_talent)*60) Spell(demoralizing_shout)
}

#
# Short
#

AddFunction ProtectionDefaultShortCDActions
{
	ProtectionHealMe()
	if ArmorSetBonus(T20 2) and RageDeficit() >= 26 Spell(berserker_rage)
	if IncomingDamage(5 physical=1) 
	{
		if not BuffPresent(shield_block_buff) and SpellCharges(shield_block) < SpellMaxCharges(shield_block) Spell(neltharions_fury)
		if not BuffPresent(neltharions_fury_buff) and (SpellCooldown(neltharions_fury)>0 or SpellCharges(shield_block) == SpellMaxCharges(shield_block)) Spell(shield_block)
	}
	if ((not BuffPresent(renewed_fury_buff) and Talent(renewed_fury_talent)) or Rage() >= 60) Spell(ignore_pain)
	# range check
	ProtectionGetInMeleeRange()
}

#
# Single-Target
#

AddFunction ProtectionDefaultMainActions
{
	Spell(shield_slam)
	if Talent(devastatator_talent) and BuffPresent(revenge_buff) Spell(revenge)
	if BuffPresent(vengeance_revenge_buff) Spell(revenge)
	Spell(thunder_clap)
	if BuffPresent(revenge_buff) Spell(revenge)
	Spell(storm_bolt)
	Spell(devastate)
}

#
# AOE
#

AddFunction ProtectionDefaultAoEActions
{
	Spell(ravager)
	Spell(revenge)
	Spell(thunder_clap)
	Spell(shield_slam)
	if Enemies() >= 3 Spell(shockwave)
	Spell(devastate)
}

#
# Cooldowns
#

AddFunction ProtectionDefaultCdActions 
{
	ProtectionInterruptActions()
	ProtectionOffensiveCooldowns()
	if IncomingDamage(1.5 magic=1) > 0 Spell(spell_reflection)
	if (HasEquippedItem(shifting_cosmic_sliver)) Spell(shield_wall)
	Item(Trinket0Slot usable=1 text=13)
	Item(Trinket1Slot usable=1 text=14)
	Spell(demoralizing_shout)
	Spell(shield_wall)
	Spell(last_stand)
	
}

#
# Icons
#

AddIcon help=shortcd specialization=protection
{
	ProtectionDefaultShortCDActions()
}

AddIcon enemies=1 help=main specialization=protection
{
	ProtectionDefaultMainActions()
}

AddIcon checkbox=opt_warrior_protection_aoe help=aoe specialization=protection
{
	ProtectionDefaultAoEActions()
}

AddIcon help=cd specialization=protection
{
	ProtectionDefaultCdActions()
}
	
`;
    OvaleScripts.RegisterScript("WARRIOR", "protection", name, desc, code, "script");
}
{
    let name = "simulationcraft_warrior_arms_t19p";
    let desc = "[7.0] SimulationCraft: Warrior_Arms_T19P";
    let code = `
# Based on SimulationCraft profile "Warrior_Arms_T19P".
#	class=warrior
#	spec=arms
#	talents=1312122

Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_warrior_spells)

AddCheckBox(opt_interrupt L(interrupt) default specialization=arms)
AddCheckBox(opt_melee_range L(not_in_melee_range) specialization=arms)
AddCheckBox(opt_use_consumables L(opt_use_consumables) default specialization=arms)

AddFunction ArmsInterruptActions
{
	if CheckBoxOn(opt_interrupt) and not target.IsFriend() and target.Casting()
	{
		if target.InRange(pummel) and target.IsInterruptible() Spell(pummel)
		if target.Distance(less 10) and not target.Classification(worldboss) Spell(shockwave)
		if target.InRange(storm_bolt) and not target.Classification(worldboss) Spell(storm_bolt)
		if target.Distance(less 8) and target.IsInterruptible() Spell(arcane_torrent_rage)
		if target.InRange(quaking_palm) and not target.Classification(worldboss) Spell(quaking_palm)
		if target.Distance(less 5) and not target.Classification(worldboss) Spell(war_stomp)
		if target.InRange(intimidating_shout) and not target.Classification(worldboss) Spell(intimidating_shout)
	}
}

AddFunction ArmsUseItemActions
{
	Item(Trinket0Slot text=13 usable=1)
	Item(Trinket1Slot text=14 usable=1)
}

AddFunction ArmsGetInMeleeRange
{
	if CheckBoxOn(opt_melee_range) and not InFlightToTarget(charge) and not InFlightToTarget(heroic_leap)
	{
		if target.InRange(charge) Spell(charge)
		if SpellCharges(charge) == 0 and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)
		if not target.InRange(pummel) Texture(misc_arrowlup help=L(not_in_melee_range))
	}
}

### actions.default

AddFunction ArmsDefaultMainActions
{
	#run_action_list,name=cleave,if=spell_targets.whirlwind>=2&talent.sweeping_strikes.enabled
	if Enemies() >= 2 and Talent(sweeping_strikes_talent) ArmsCleaveMainActions()

	unless Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveMainPostConditions()
	{
		#run_action_list,name=aoe,if=spell_targets.whirlwind>=5&!talent.sweeping_strikes.enabled
		if Enemies() >= 5 and not Talent(sweeping_strikes_talent) ArmsAoeMainActions()

		unless Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeMainPostConditions()
		{
			#run_action_list,name=execute,target_if=target.health.pct<=20&spell_targets.whirlwind<5
			if target.HealthPercent() <= 20 and Enemies() < 5 ArmsExecuteMainActions()

			unless target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteMainPostConditions()
			{
				#run_action_list,name=single,if=target.health.pct>20
				if target.HealthPercent() > 20 ArmsSingleMainActions()
			}
		}
	}
}

AddFunction ArmsDefaultMainPostConditions
{
	Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveMainPostConditions() or Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeMainPostConditions() or target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteMainPostConditions() or target.HealthPercent() > 20 and ArmsSingleMainPostConditions()
}

AddFunction ArmsDefaultShortCdActions
{
	#charge
	if CheckBoxOn(opt_melee_range) and target.InRange(charge) Spell(charge)
	#auto_attack
	ArmsGetInMeleeRange()
	#run_action_list,name=cleave,if=spell_targets.whirlwind>=2&talent.sweeping_strikes.enabled
	if Enemies() >= 2 and Talent(sweeping_strikes_talent) ArmsCleaveShortCdActions()

	unless Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveShortCdPostConditions()
	{
		#run_action_list,name=aoe,if=spell_targets.whirlwind>=5&!talent.sweeping_strikes.enabled
		if Enemies() >= 5 and not Talent(sweeping_strikes_talent) ArmsAoeShortCdActions()

		unless Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeShortCdPostConditions()
		{
			#run_action_list,name=execute,target_if=target.health.pct<=20&spell_targets.whirlwind<5
			if target.HealthPercent() <= 20 and Enemies() < 5 ArmsExecuteShortCdActions()

			unless target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteShortCdPostConditions()
			{
				#run_action_list,name=single,if=target.health.pct>20
				if target.HealthPercent() > 20 ArmsSingleShortCdActions()
			}
		}
	}
}

AddFunction ArmsDefaultShortCdPostConditions
{
	Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveShortCdPostConditions() or Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeShortCdPostConditions() or target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteShortCdPostConditions() or target.HealthPercent() > 20 and ArmsSingleShortCdPostConditions()
}

AddFunction ArmsDefaultCdActions
{
	#pummel
	ArmsInterruptActions()
	#potion,name=old_war,if=(!talent.avatar.enabled|buff.avatar.up)&buff.battle_cry.up&debuff.colossus_smash.up|target.time_to_die<=26
	if { { not Talent(avatar_talent) or BuffPresent(avatar_buff) } and BuffPresent(battle_cry_buff) and target.DebuffPresent(colossus_smash_debuff) or target.TimeToDie() <= 26 } and CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(old_war_potion usable=1)
	#blood_fury,if=buff.battle_cry.up|target.time_to_die<=16
	if BuffPresent(battle_cry_buff) or target.TimeToDie() <= 16 Spell(blood_fury_ap)
	#berserking,if=buff.battle_cry.up|target.time_to_die<=11
	if BuffPresent(battle_cry_buff) or target.TimeToDie() <= 11 Spell(berserking)
	#arcane_torrent,if=buff.battle_cry_deadly_calm.down&rage.deficit>40&cooldown.battle_cry.remains
	if BuffExpires(battle_cry_deadly_calm_buff) and RageDeficit() > 40 and SpellCooldown(battle_cry) > 0 Spell(arcane_torrent_rage)
	#avatar,if=gcd.remains<0.25&(buff.battle_cry.up|cooldown.battle_cry.remains<15)|target.time_to_die<=20
	if 0 < 0.25 and { BuffPresent(battle_cry_buff) or SpellCooldown(battle_cry) < 15 } or target.TimeToDie() <= 20 Spell(avatar)
	#battle_cry,if=target.time_to_die<=6|(gcd.remains<=0.5&prev_gcd.1.ravager)|!talent.ravager.enabled&!gcd.remains&target.debuff.colossus_smash.remains>=5&(!cooldown.bladestorm.remains|!set_bonus.tier20_4pc)&(!talent.rend.enabled|dot.rend.remains>4)
	if target.TimeToDie() <= 6 or 0 <= 0.5 and PreviousGCDSpell(ravager) or not Talent(ravager_talent) and not 0 and target.DebuffRemaining(colossus_smash_debuff) >= 5 and { not SpellCooldown(bladestorm_arms) > 0 or not ArmorSetBonus(T20 4) } and { not Talent(rend_talent) or target.DebuffRemaining(rend_debuff) > 4 } Spell(battle_cry)
	#use_items
	ArmsUseItemActions()
	#run_action_list,name=cleave,if=spell_targets.whirlwind>=2&talent.sweeping_strikes.enabled
	if Enemies() >= 2 and Talent(sweeping_strikes_talent) ArmsCleaveCdActions()

	unless Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveCdPostConditions()
	{
		#run_action_list,name=aoe,if=spell_targets.whirlwind>=5&!talent.sweeping_strikes.enabled
		if Enemies() >= 5 and not Talent(sweeping_strikes_talent) ArmsAoeCdActions()

		unless Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeCdPostConditions()
		{
			#run_action_list,name=execute,target_if=target.health.pct<=20&spell_targets.whirlwind<5
			if target.HealthPercent() <= 20 and Enemies() < 5 ArmsExecuteCdActions()

			unless target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteCdPostConditions()
			{
				#run_action_list,name=single,if=target.health.pct>20
				if target.HealthPercent() > 20 ArmsSingleCdActions()
			}
		}
	}
}

AddFunction ArmsDefaultCdPostConditions
{
	Enemies() >= 2 and Talent(sweeping_strikes_talent) and ArmsCleaveCdPostConditions() or Enemies() >= 5 and not Talent(sweeping_strikes_talent) and ArmsAoeCdPostConditions() or target.HealthPercent() <= 20 and Enemies() < 5 and ArmsExecuteCdPostConditions() or target.HealthPercent() > 20 and ArmsSingleCdPostConditions()
}

### actions.aoe

AddFunction ArmsAoeMainActions
{
	#warbreaker,if=(cooldown.bladestorm.up|cooldown.bladestorm.remains<=gcd)&(cooldown.battle_cry.up|cooldown.battle_cry.remains<=gcd)
	if { not SpellCooldown(bladestorm_arms) > 0 or SpellCooldown(bladestorm_arms) <= GCD() } and { not SpellCooldown(battle_cry) > 0 or SpellCooldown(battle_cry) <= GCD() } Spell(warbreaker)
	#colossus_smash,if=buff.in_for_the_kill.down&talent.in_for_the_kill.enabled
	if BuffExpires(in_for_the_kill_buff) and Talent(in_for_the_kill_talent) Spell(colossus_smash)
	#colossus_smash,cycle_targets=1,if=debuff.colossus_smash.down&spell_targets.whirlwind<=10
	if target.DebuffExpires(colossus_smash_debuff) and Enemies() <= 10 Spell(colossus_smash)
	#cleave,if=spell_targets.whirlwind>=5
	if Enemies() >= 5 Spell(cleave)
	#whirlwind,if=spell_targets.whirlwind>=5&buff.cleave.up
	if Enemies() >= 5 and BuffPresent(cleave_buff) Spell(whirlwind)
	#whirlwind,if=spell_targets.whirlwind>=7
	if Enemies() >= 7 Spell(whirlwind)
	#colossus_smash,if=buff.shattered_defenses.down
	if BuffExpires(shattered_defenses_buff) Spell(colossus_smash)
	#execute,if=buff.stone_heart.react
	if BuffPresent(stone_heart_buff) Spell(execute_arms)
	#mortal_strike,if=buff.shattered_defenses.up|buff.executioners_precision.down
	if BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) Spell(mortal_strike)
	#rend,cycle_targets=1,if=remains<=duration*0.3&spell_targets.whirlwind<=3
	if target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Enemies() <= 3 Spell(rend)
	#cleave
	Spell(cleave)
	#whirlwind
	Spell(whirlwind)
}

AddFunction ArmsAoeMainPostConditions
{
}

AddFunction ArmsAoeShortCdActions
{
	unless { not SpellCooldown(bladestorm_arms) > 0 or SpellCooldown(bladestorm_arms) <= GCD() } and { not SpellCooldown(battle_cry) > 0 or SpellCooldown(battle_cry) <= GCD() } and Spell(warbreaker)
	{
		#bladestorm,if=buff.battle_cry.up&(set_bonus.tier20_4pc|equipped.the_great_storms_eye)
		if BuffPresent(battle_cry_buff) and { ArmorSetBonus(T20 4) or HasEquippedItem(the_great_storms_eye) } Spell(bladestorm_arms)
	}
}

AddFunction ArmsAoeShortCdPostConditions
{
	{ not SpellCooldown(bladestorm_arms) > 0 or SpellCooldown(bladestorm_arms) <= GCD() } and { not SpellCooldown(battle_cry) > 0 or SpellCooldown(battle_cry) <= GCD() } and Spell(warbreaker) or BuffExpires(in_for_the_kill_buff) and Talent(in_for_the_kill_talent) and Spell(colossus_smash) or target.DebuffExpires(colossus_smash_debuff) and Enemies() <= 10 and Spell(colossus_smash) or Enemies() >= 5 and Spell(cleave) or Enemies() >= 5 and BuffPresent(cleave_buff) and Spell(whirlwind) or Enemies() >= 7 and Spell(whirlwind) or BuffExpires(shattered_defenses_buff) and Spell(colossus_smash) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or { BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) } and Spell(mortal_strike) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Enemies() <= 3 and Spell(rend) or Spell(cleave) or Spell(whirlwind)
}

AddFunction ArmsAoeCdActions
{
}

AddFunction ArmsAoeCdPostConditions
{
	{ not SpellCooldown(bladestorm_arms) > 0 or SpellCooldown(bladestorm_arms) <= GCD() } and { not SpellCooldown(battle_cry) > 0 or SpellCooldown(battle_cry) <= GCD() } and Spell(warbreaker) or BuffPresent(battle_cry_buff) and { ArmorSetBonus(T20 4) or HasEquippedItem(the_great_storms_eye) } and Spell(bladestorm_arms) or BuffExpires(in_for_the_kill_buff) and Talent(in_for_the_kill_talent) and Spell(colossus_smash) or target.DebuffExpires(colossus_smash_debuff) and Enemies() <= 10 and Spell(colossus_smash) or Enemies() >= 5 and Spell(cleave) or Enemies() >= 5 and BuffPresent(cleave_buff) and Spell(whirlwind) or Enemies() >= 7 and Spell(whirlwind) or BuffExpires(shattered_defenses_buff) and Spell(colossus_smash) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or { BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) } and Spell(mortal_strike) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Enemies() <= 3 and Spell(rend) or Spell(cleave) or Spell(whirlwind)
}

### actions.cleave

AddFunction ArmsCleaveMainActions
{
	#mortal_strike
	Spell(mortal_strike)
	#execute,if=buff.stone_heart.react
	if BuffPresent(stone_heart_buff) Spell(execute_arms)
	#colossus_smash,if=buff.shattered_defenses.down&buff.precise_strikes.down
	if BuffExpires(shattered_defenses_buff) and BuffExpires(precise_strikes_buff) Spell(colossus_smash)
	#warbreaker,if=buff.shattered_defenses.down
	if BuffExpires(shattered_defenses_buff) Spell(warbreaker)
	#whirlwind,if=talent.fervor_of_battle.enabled&(debuff.colossus_smash.up|rage.deficit<50)&(!talent.focused_rage.enabled|buff.battle_cry_deadly_calm.up|buff.cleave.up)
	if Talent(fervor_of_battle_talent) and { target.DebuffPresent(colossus_smash_debuff) or RageDeficit() < 50 } and { not Talent(focused_rage_talent) or BuffPresent(battle_cry_deadly_calm_buff) or BuffPresent(cleave_buff) } Spell(whirlwind)
	#rend,if=remains<=duration*0.3
	if target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 Spell(rend)
	#cleave
	Spell(cleave)
	#whirlwind,if=rage>40|buff.cleave.up
	if Rage() > 40 or BuffPresent(cleave_buff) Spell(whirlwind)
}

AddFunction ArmsCleaveMainPostConditions
{
}

AddFunction ArmsCleaveShortCdActions
{
	unless Spell(mortal_strike) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(shattered_defenses_buff) and BuffExpires(precise_strikes_buff) and Spell(colossus_smash) or BuffExpires(shattered_defenses_buff) and Spell(warbreaker)
	{
		#focused_rage,if=rage>100|buff.battle_cry_deadly_calm.up
		if Rage() > 100 or BuffPresent(battle_cry_deadly_calm_buff) Spell(focused_rage)

		unless Talent(fervor_of_battle_talent) and { target.DebuffPresent(colossus_smash_debuff) or RageDeficit() < 50 } and { not Talent(focused_rage_talent) or BuffPresent(battle_cry_deadly_calm_buff) or BuffPresent(cleave_buff) } and Spell(whirlwind) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend)
		{
			#bladestorm
			Spell(bladestorm_arms)

			unless Spell(cleave) or { Rage() > 40 or BuffPresent(cleave_buff) } and Spell(whirlwind)
			{
				#shockwave
				Spell(shockwave)
				#storm_bolt
				Spell(storm_bolt)
			}
		}
	}
}

AddFunction ArmsCleaveShortCdPostConditions
{
	Spell(mortal_strike) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(shattered_defenses_buff) and BuffExpires(precise_strikes_buff) and Spell(colossus_smash) or BuffExpires(shattered_defenses_buff) and Spell(warbreaker) or Talent(fervor_of_battle_talent) and { target.DebuffPresent(colossus_smash_debuff) or RageDeficit() < 50 } and { not Talent(focused_rage_talent) or BuffPresent(battle_cry_deadly_calm_buff) or BuffPresent(cleave_buff) } and Spell(whirlwind) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend) or Spell(cleave) or { Rage() > 40 or BuffPresent(cleave_buff) } and Spell(whirlwind)
}

AddFunction ArmsCleaveCdActions
{
}

AddFunction ArmsCleaveCdPostConditions
{
	Spell(mortal_strike) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(shattered_defenses_buff) and BuffExpires(precise_strikes_buff) and Spell(colossus_smash) or BuffExpires(shattered_defenses_buff) and Spell(warbreaker) or Talent(fervor_of_battle_talent) and { target.DebuffPresent(colossus_smash_debuff) or RageDeficit() < 50 } and { not Talent(focused_rage_talent) or BuffPresent(battle_cry_deadly_calm_buff) or BuffPresent(cleave_buff) } and Spell(whirlwind) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend) or Spell(bladestorm_arms) or Spell(cleave) or { Rage() > 40 or BuffPresent(cleave_buff) } and Spell(whirlwind) or Spell(shockwave) or Spell(storm_bolt)
}

### actions.execute

AddFunction ArmsExecuteMainActions
{
	#colossus_smash,if=buff.shattered_defenses.down&(buff.battle_cry.down|buff.battle_cry.remains>gcd.max)
	if BuffExpires(shattered_defenses_buff) and { BuffExpires(battle_cry_buff) or BuffRemaining(battle_cry_buff) > GCD() } Spell(colossus_smash)
	#warbreaker,if=(raid_event.adds.in>90|!raid_event.adds.exists)&cooldown.mortal_strike.remains<=gcd.remains&buff.shattered_defenses.down&buff.executioners_precision.stack=2
	if { 600 > 90 or not False(raid_event_adds_exists) } and SpellCooldown(mortal_strike) <= GCDRemaining() and BuffExpires(shattered_defenses_buff) and BuffStacks(executioners_precision_buff) == 2 Spell(warbreaker)
	#rend,if=remains<5&cooldown.battle_cry.remains<2&(cooldown.bladestorm.remains<2|!set_bonus.tier20_4pc)
	if target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } Spell(rend)
	#mortal_strike,if=buff.executioners_precision.stack=2&buff.shattered_defenses.up
	if BuffStacks(executioners_precision_buff) == 2 and BuffPresent(shattered_defenses_buff) Spell(mortal_strike)
	#overpower,if=rage<40
	if Rage() < 40 Spell(overpower)
	#execute,if=buff.shattered_defenses.down|rage>=40|talent.dauntless.enabled&rage>=36
	if BuffExpires(shattered_defenses_buff) or Rage() >= 40 or Talent(dauntless_talent) and Rage() >= 36 Spell(execute_arms)
}

AddFunction ArmsExecuteMainPostConditions
{
}

AddFunction ArmsExecuteShortCdActions
{
	#bladestorm,if=buff.battle_cry.up&(set_bonus.tier20_4pc|equipped.the_great_storms_eye)
	if BuffPresent(battle_cry_buff) and { ArmorSetBonus(T20 4) or HasEquippedItem(the_great_storms_eye) } Spell(bladestorm_arms)

	unless BuffExpires(shattered_defenses_buff) and { BuffExpires(battle_cry_buff) or BuffRemaining(battle_cry_buff) > GCD() } and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and SpellCooldown(mortal_strike) <= GCDRemaining() and BuffExpires(shattered_defenses_buff) and BuffStacks(executioners_precision_buff) == 2 and Spell(warbreaker)
	{
		#focused_rage,if=rage.deficit<35
		if RageDeficit() < 35 Spell(focused_rage)

		unless target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } and Spell(rend)
		{
			#ravager,if=cooldown.battle_cry.remains<=gcd&debuff.colossus_smash.remains>6
			if SpellCooldown(battle_cry) <= GCD() and target.DebuffRemaining(colossus_smash_debuff) > 6 Spell(ravager)

			unless BuffStacks(executioners_precision_buff) == 2 and BuffPresent(shattered_defenses_buff) and Spell(mortal_strike) or Rage() < 40 and Spell(overpower) or { BuffExpires(shattered_defenses_buff) or Rage() >= 40 or Talent(dauntless_talent) and Rage() >= 36 } and Spell(execute_arms)
			{
				#bladestorm,interrupt=1,if=(raid_event.adds.in>90|!raid_event.adds.exists|spell_targets.bladestorm_mh>desired_targets)&!set_bonus.tier20_4pc
				if { 600 > 90 or not False(raid_event_adds_exists) or Enemies() > Enemies(tagged=1) } and not ArmorSetBonus(T20 4) Spell(bladestorm_arms)
			}
		}
	}
}

AddFunction ArmsExecuteShortCdPostConditions
{
	BuffExpires(shattered_defenses_buff) and { BuffExpires(battle_cry_buff) or BuffRemaining(battle_cry_buff) > GCD() } and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and SpellCooldown(mortal_strike) <= GCDRemaining() and BuffExpires(shattered_defenses_buff) and BuffStacks(executioners_precision_buff) == 2 and Spell(warbreaker) or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } and Spell(rend) or BuffStacks(executioners_precision_buff) == 2 and BuffPresent(shattered_defenses_buff) and Spell(mortal_strike) or Rage() < 40 and Spell(overpower) or { BuffExpires(shattered_defenses_buff) or Rage() >= 40 or Talent(dauntless_talent) and Rage() >= 36 } and Spell(execute_arms)
}

AddFunction ArmsExecuteCdActions
{
}

AddFunction ArmsExecuteCdPostConditions
{
	BuffPresent(battle_cry_buff) and { ArmorSetBonus(T20 4) or HasEquippedItem(the_great_storms_eye) } and Spell(bladestorm_arms) or BuffExpires(shattered_defenses_buff) and { BuffExpires(battle_cry_buff) or BuffRemaining(battle_cry_buff) > GCD() } and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and SpellCooldown(mortal_strike) <= GCDRemaining() and BuffExpires(shattered_defenses_buff) and BuffStacks(executioners_precision_buff) == 2 and Spell(warbreaker) or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } and Spell(rend) or SpellCooldown(battle_cry) <= GCD() and target.DebuffRemaining(colossus_smash_debuff) > 6 and Spell(ravager) or BuffStacks(executioners_precision_buff) == 2 and BuffPresent(shattered_defenses_buff) and Spell(mortal_strike) or Rage() < 40 and Spell(overpower) or { BuffExpires(shattered_defenses_buff) or Rage() >= 40 or Talent(dauntless_talent) and Rage() >= 36 } and Spell(execute_arms) or { 600 > 90 or not False(raid_event_adds_exists) or Enemies() > Enemies(tagged=1) } and not ArmorSetBonus(T20 4) and Spell(bladestorm_arms)
}

### actions.precombat

AddFunction ArmsPrecombatMainActions
{
}

AddFunction ArmsPrecombatMainPostConditions
{
}

AddFunction ArmsPrecombatShortCdActions
{
}

AddFunction ArmsPrecombatShortCdPostConditions
{
}

AddFunction ArmsPrecombatCdActions
{
	#flask,type=countless_armies
	#food,type=lavish_suramar_feast
	#augmentation,type=defiled
	#snapshot_stats
	#potion,name=old_war
	if CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(old_war_potion usable=1)
}

AddFunction ArmsPrecombatCdPostConditions
{
}

### actions.single

AddFunction ArmsSingleMainActions
{
	#colossus_smash,if=buff.shattered_defenses.down
	if BuffExpires(shattered_defenses_buff) Spell(colossus_smash)
	#warbreaker,if=(raid_event.adds.in>90|!raid_event.adds.exists)&((talent.fervor_of_battle.enabled&debuff.colossus_smash.remains<gcd)|!talent.fervor_of_battle.enabled&((buff.stone_heart.up|cooldown.mortal_strike.remains<=gcd.remains)&buff.shattered_defenses.down))
	if { 600 > 90 or not False(raid_event_adds_exists) } and { Talent(fervor_of_battle_talent) and target.DebuffRemaining(colossus_smash_debuff) < GCD() or not Talent(fervor_of_battle_talent) and { BuffPresent(stone_heart_buff) or SpellCooldown(mortal_strike) <= GCDRemaining() } and BuffExpires(shattered_defenses_buff) } Spell(warbreaker)
	#rend,if=remains<=gcd.max|remains<5&cooldown.battle_cry.remains<2&(cooldown.bladestorm.remains<2|!set_bonus.tier20_4pc)
	if target.DebuffRemaining(rend_debuff) <= GCD() or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } Spell(rend)
	#execute,if=buff.stone_heart.react
	if BuffPresent(stone_heart_buff) Spell(execute_arms)
	#overpower,if=buff.battle_cry.down
	if BuffExpires(battle_cry_buff) Spell(overpower)
	#mortal_strike,if=buff.shattered_defenses.up|buff.executioners_precision.down
	if BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) Spell(mortal_strike)
	#rend,if=remains<=duration*0.3
	if target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 Spell(rend)
	#whirlwind,if=spell_targets.whirlwind>1|talent.fervor_of_battle.enabled
	if Enemies() > 1 or Talent(fervor_of_battle_talent) Spell(whirlwind)
	#slam,if=spell_targets.whirlwind=1&!talent.fervor_of_battle.enabled&(rage>=52|!talent.rend.enabled|!talent.ravager.enabled)
	if Enemies() == 1 and not Talent(fervor_of_battle_talent) and { Rage() >= 52 or not Talent(rend_talent) or not Talent(ravager_talent) } Spell(slam)
	#overpower
	Spell(overpower)
}

AddFunction ArmsSingleMainPostConditions
{
}

AddFunction ArmsSingleShortCdActions
{
	#bladestorm,if=buff.battle_cry.up&set_bonus.tier20_4pc
	if BuffPresent(battle_cry_buff) and ArmorSetBonus(T20 4) Spell(bladestorm_arms)

	unless BuffExpires(shattered_defenses_buff) and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and { Talent(fervor_of_battle_talent) and target.DebuffRemaining(colossus_smash_debuff) < GCD() or not Talent(fervor_of_battle_talent) and { BuffPresent(stone_heart_buff) or SpellCooldown(mortal_strike) <= GCDRemaining() } and BuffExpires(shattered_defenses_buff) } and Spell(warbreaker)
	{
		#focused_rage,if=!buff.battle_cry_deadly_calm.up&buff.focused_rage.stack<3&!cooldown.colossus_smash.up&(rage>=130|debuff.colossus_smash.down|talent.anger_management.enabled&cooldown.battle_cry.remains<=8)
		if not BuffPresent(battle_cry_deadly_calm_buff) and BuffStacks(focused_rage_buff) < 3 and not { not SpellCooldown(colossus_smash) > 0 } and { Rage() >= 130 or target.DebuffExpires(colossus_smash_debuff) or Talent(anger_management_talent) and SpellCooldown(battle_cry) <= 8 } Spell(focused_rage)

		unless { target.DebuffRemaining(rend_debuff) <= GCD() or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } } and Spell(rend)
		{
			#ravager,if=cooldown.battle_cry.remains<=gcd&debuff.colossus_smash.remains>6
			if SpellCooldown(battle_cry) <= GCD() and target.DebuffRemaining(colossus_smash_debuff) > 6 Spell(ravager)

			unless BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(battle_cry_buff) and Spell(overpower) or { BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) } and Spell(mortal_strike) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend) or { Enemies() > 1 or Talent(fervor_of_battle_talent) } and Spell(whirlwind) or Enemies() == 1 and not Talent(fervor_of_battle_talent) and { Rage() >= 52 or not Talent(rend_talent) or not Talent(ravager_talent) } and Spell(slam) or Spell(overpower)
			{
				#bladestorm,if=(raid_event.adds.in>90|!raid_event.adds.exists)&!set_bonus.tier20_4pc
				if { 600 > 90 or not False(raid_event_adds_exists) } and not ArmorSetBonus(T20 4) Spell(bladestorm_arms)
			}
		}
	}
}

AddFunction ArmsSingleShortCdPostConditions
{
	BuffExpires(shattered_defenses_buff) and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and { Talent(fervor_of_battle_talent) and target.DebuffRemaining(colossus_smash_debuff) < GCD() or not Talent(fervor_of_battle_talent) and { BuffPresent(stone_heart_buff) or SpellCooldown(mortal_strike) <= GCDRemaining() } and BuffExpires(shattered_defenses_buff) } and Spell(warbreaker) or { target.DebuffRemaining(rend_debuff) <= GCD() or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } } and Spell(rend) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(battle_cry_buff) and Spell(overpower) or { BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) } and Spell(mortal_strike) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend) or { Enemies() > 1 or Talent(fervor_of_battle_talent) } and Spell(whirlwind) or Enemies() == 1 and not Talent(fervor_of_battle_talent) and { Rage() >= 52 or not Talent(rend_talent) or not Talent(ravager_talent) } and Spell(slam) or Spell(overpower)
}

AddFunction ArmsSingleCdActions
{
}

AddFunction ArmsSingleCdPostConditions
{
	BuffPresent(battle_cry_buff) and ArmorSetBonus(T20 4) and Spell(bladestorm_arms) or BuffExpires(shattered_defenses_buff) and Spell(colossus_smash) or { 600 > 90 or not False(raid_event_adds_exists) } and { Talent(fervor_of_battle_talent) and target.DebuffRemaining(colossus_smash_debuff) < GCD() or not Talent(fervor_of_battle_talent) and { BuffPresent(stone_heart_buff) or SpellCooldown(mortal_strike) <= GCDRemaining() } and BuffExpires(shattered_defenses_buff) } and Spell(warbreaker) or { target.DebuffRemaining(rend_debuff) <= GCD() or target.DebuffRemaining(rend_debuff) < 5 and SpellCooldown(battle_cry) < 2 and { SpellCooldown(bladestorm_arms) < 2 or not ArmorSetBonus(T20 4) } } and Spell(rend) or SpellCooldown(battle_cry) <= GCD() and target.DebuffRemaining(colossus_smash_debuff) > 6 and Spell(ravager) or BuffPresent(stone_heart_buff) and Spell(execute_arms) or BuffExpires(battle_cry_buff) and Spell(overpower) or { BuffPresent(shattered_defenses_buff) or BuffExpires(executioners_precision_buff) } and Spell(mortal_strike) or target.DebuffRemaining(rend_debuff) <= BaseDuration(rend_debuff) * 0.3 and Spell(rend) or { Enemies() > 1 or Talent(fervor_of_battle_talent) } and Spell(whirlwind) or Enemies() == 1 and not Talent(fervor_of_battle_talent) and { Rage() >= 52 or not Talent(rend_talent) or not Talent(ravager_talent) } and Spell(slam) or Spell(overpower) or { 600 > 90 or not False(raid_event_adds_exists) } and not ArmorSetBonus(T20 4) and Spell(bladestorm_arms)
}

### Arms icons.

AddCheckBox(opt_warrior_arms_aoe L(AOE) default specialization=arms)

AddIcon checkbox=!opt_warrior_arms_aoe enemies=1 help=shortcd specialization=arms
{
	if not InCombat() ArmsPrecombatShortCdActions()
	unless not InCombat() and ArmsPrecombatShortCdPostConditions()
	{
		ArmsDefaultShortCdActions()
	}
}

AddIcon checkbox=opt_warrior_arms_aoe help=shortcd specialization=arms
{
	if not InCombat() ArmsPrecombatShortCdActions()
	unless not InCombat() and ArmsPrecombatShortCdPostConditions()
	{
		ArmsDefaultShortCdActions()
	}
}

AddIcon enemies=1 help=main specialization=arms
{
	if not InCombat() ArmsPrecombatMainActions()
	unless not InCombat() and ArmsPrecombatMainPostConditions()
	{
		ArmsDefaultMainActions()
	}
}

AddIcon checkbox=opt_warrior_arms_aoe help=aoe specialization=arms
{
	if not InCombat() ArmsPrecombatMainActions()
	unless not InCombat() and ArmsPrecombatMainPostConditions()
	{
		ArmsDefaultMainActions()
	}
}

AddIcon checkbox=!opt_warrior_arms_aoe enemies=1 help=cd specialization=arms
{
	if not InCombat() ArmsPrecombatCdActions()
	unless not InCombat() and ArmsPrecombatCdPostConditions()
	{
		ArmsDefaultCdActions()
	}
}

AddIcon checkbox=opt_warrior_arms_aoe help=cd specialization=arms
{
	if not InCombat() ArmsPrecombatCdActions()
	unless not InCombat() and ArmsPrecombatCdPostConditions()
	{
		ArmsDefaultCdActions()
	}
}

### Required symbols
# anger_management_talent
# arcane_torrent_rage
# avatar
# avatar_buff
# avatar_talent
# battle_cry
# battle_cry_buff
# battle_cry_deadly_calm_buff
# berserking
# bladestorm_arms
# blood_fury_ap
# charge
# cleave
# cleave_buff
# colossus_smash
# colossus_smash_debuff
# dauntless_talent
# execute_arms
# executioners_precision_buff
# fervor_of_battle_talent
# focused_rage
# focused_rage_buff
# focused_rage_talent
# heroic_leap
# in_for_the_kill_buff
# in_for_the_kill_talent
# intimidating_shout
# mortal_strike
# old_war_potion
# overpower
# precise_strikes_buff
# pummel
# quaking_palm
# ravager
# ravager_talent
# rend
# rend_debuff
# rend_talent
# shattered_defenses_buff
# shockwave
# slam
# stone_heart_buff
# storm_bolt
# sweeping_strikes_talent
# the_great_storms_eye
# war_stomp
# warbreaker
# whirlwind
`;
    OvaleScripts.RegisterScript("WARRIOR", "arms", name, desc, code, "script");
}
{
    let name = "simulationcraft_warrior_fury_t19p";
    let desc = "[7.0] SimulationCraft: Warrior_Fury_T19P";
    let code = `
# Based on SimulationCraft profile "Warrior_Fury_T19P".
#	class=warrior
#	spec=fury
#	talents=2333232

Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_warrior_spells)

AddCheckBox(opt_interrupt L(interrupt) default specialization=fury)
AddCheckBox(opt_melee_range L(not_in_melee_range) specialization=fury)
AddCheckBox(opt_use_consumables L(opt_use_consumables) default specialization=fury)

AddFunction FuryInterruptActions
{
	if CheckBoxOn(opt_interrupt) and not target.IsFriend() and target.Casting()
	{
		if target.InRange(pummel) and target.IsInterruptible() Spell(pummel)
		if target.Distance(less 10) and not target.Classification(worldboss) Spell(shockwave)
		if target.InRange(storm_bolt) and not target.Classification(worldboss) Spell(storm_bolt)
		if target.Distance(less 8) and target.IsInterruptible() Spell(arcane_torrent_rage)
		if target.InRange(quaking_palm) and not target.Classification(worldboss) Spell(quaking_palm)
		if target.Distance(less 5) and not target.Classification(worldboss) Spell(war_stomp)
		if target.InRange(intimidating_shout) and not target.Classification(worldboss) Spell(intimidating_shout)
	}
}

AddFunction FuryUseItemActions
{
	Item(Trinket0Slot text=13 usable=1)
	Item(Trinket1Slot text=14 usable=1)
}

AddFunction FuryGetInMeleeRange
{
	if CheckBoxOn(opt_melee_range) and not InFlightToTarget(charge) and not InFlightToTarget(heroic_leap)
	{
		if target.InRange(charge) Spell(charge)
		if SpellCharges(charge) == 0 and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)
		if not target.InRange(pummel) Texture(misc_arrowlup help=L(not_in_melee_range))
	}
}

### actions.default

AddFunction FuryDefaultMainActions
{
	#run_action_list,name=movement,if=movement.distance>5
	if target.Distance() > 5 FuryMovementMainActions()

	unless target.Distance() > 5 and FuryMovementMainPostConditions()
	{
		#dragon_roar,if=(equipped.convergence_of_fates&cooldown.battle_cry.remains<2)|!equipped.convergence_of_fates&(cooldown.battle_cry.remains>10|cooldown.battle_cry.remains<2)
		if HasEquippedItem(convergence_of_fates) and SpellCooldown(battle_cry) < 2 or not HasEquippedItem(convergence_of_fates) and { SpellCooldown(battle_cry) > 10 or SpellCooldown(battle_cry) < 2 } Spell(dragon_roar)
		#bloodbath,if=buff.dragon_roar.up|!talent.dragon_roar.enabled&buff.battle_cry.up
		if BuffPresent(dragon_roar_buff) or not Talent(dragon_roar_talent) and BuffPresent(battle_cry_buff) Spell(bloodbath)
		#call_action_list,name=cooldowns,if=buff.battle_cry.up
		if BuffPresent(battle_cry_buff) FuryCooldownsMainActions()

		unless BuffPresent(battle_cry_buff) and FuryCooldownsMainPostConditions()
		{
			#call_action_list,name=aoe,if=spell_targets.whirlwind>3
			if Enemies() > 3 FuryAoeMainActions()

			unless Enemies() > 3 and FuryAoeMainPostConditions()
			{
				#call_action_list,name=execute,if=target.health.pct<20
				if target.HealthPercent() < 20 FuryExecuteMainActions()

				unless target.HealthPercent() < 20 and FuryExecuteMainPostConditions()
				{
					#call_action_list,name=single_target,if=target.health.pct>20
					if target.HealthPercent() > 20 FurySingleTargetMainActions()
				}
			}
		}
	}
}

AddFunction FuryDefaultMainPostConditions
{
	target.Distance() > 5 and FuryMovementMainPostConditions() or BuffPresent(battle_cry_buff) and FuryCooldownsMainPostConditions() or Enemies() > 3 and FuryAoeMainPostConditions() or target.HealthPercent() < 20 and FuryExecuteMainPostConditions() or target.HealthPercent() > 20 and FurySingleTargetMainPostConditions()
}

AddFunction FuryDefaultShortCdActions
{
	#auto_attack
	FuryGetInMeleeRange()
	#charge
	if CheckBoxOn(opt_melee_range) and target.InRange(charge) Spell(charge)
	#run_action_list,name=movement,if=movement.distance>5
	if target.Distance() > 5 FuryMovementShortCdActions()

	unless target.Distance() > 5 and FuryMovementShortCdPostConditions()
	{
		#heroic_leap,if=(raid_event.movement.distance>25&raid_event.movement.in>45)|!raid_event.movement.exists
		if { target.Distance() > 25 and 600 > 45 or not False(raid_event_movement_exists) } and CheckBoxOn(opt_melee_range) and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)

		unless { HasEquippedItem(convergence_of_fates) and SpellCooldown(battle_cry) < 2 or not HasEquippedItem(convergence_of_fates) and { SpellCooldown(battle_cry) > 10 or SpellCooldown(battle_cry) < 2 } } and Spell(dragon_roar)
		{
			#call_action_list,name=cooldowns,if=buff.battle_cry.up
			if BuffPresent(battle_cry_buff) FuryCooldownsShortCdActions()

			unless BuffPresent(battle_cry_buff) and FuryCooldownsShortCdPostConditions()
			{
				#call_action_list,name=aoe,if=spell_targets.whirlwind>3
				if Enemies() > 3 FuryAoeShortCdActions()

				unless Enemies() > 3 and FuryAoeShortCdPostConditions()
				{
					#call_action_list,name=execute,if=target.health.pct<20
					if target.HealthPercent() < 20 FuryExecuteShortCdActions()

					unless target.HealthPercent() < 20 and FuryExecuteShortCdPostConditions()
					{
						#call_action_list,name=single_target,if=target.health.pct>20
						if target.HealthPercent() > 20 FurySingleTargetShortCdActions()
					}
				}
			}
		}
	}
}

AddFunction FuryDefaultShortCdPostConditions
{
	target.Distance() > 5 and FuryMovementShortCdPostConditions() or { HasEquippedItem(convergence_of_fates) and SpellCooldown(battle_cry) < 2 or not HasEquippedItem(convergence_of_fates) and { SpellCooldown(battle_cry) > 10 or SpellCooldown(battle_cry) < 2 } } and Spell(dragon_roar) or BuffPresent(battle_cry_buff) and FuryCooldownsShortCdPostConditions() or Enemies() > 3 and FuryAoeShortCdPostConditions() or target.HealthPercent() < 20 and FuryExecuteShortCdPostConditions() or target.HealthPercent() > 20 and FurySingleTargetShortCdPostConditions()
}

AddFunction FuryDefaultCdActions
{
	#pummel
	FuryInterruptActions()
	#run_action_list,name=movement,if=movement.distance>5
	if target.Distance() > 5 FuryMovementCdActions()

	unless target.Distance() > 5 and FuryMovementCdPostConditions()
	{
		#potion,name=old_war,if=(target.health.pct<20&buff.battle_cry.up)|target.time_to_die<30
		if { target.HealthPercent() < 20 and BuffPresent(battle_cry_buff) or target.TimeToDie() < 30 } and CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(old_war_potion usable=1)
		#use_item,name=faulty_countermeasure,if=buff.battle_cry.up&buff.enrage.up
		if BuffPresent(battle_cry_buff) and IsEnraged() FuryUseItemActions()

		unless { HasEquippedItem(convergence_of_fates) and SpellCooldown(battle_cry) < 2 or not HasEquippedItem(convergence_of_fates) and { SpellCooldown(battle_cry) > 10 or SpellCooldown(battle_cry) < 2 } } and Spell(dragon_roar)
		{
			#battle_cry,if=gcd.remains=0&!talent.dragon_roar.enabled&(!equipped.convergence_of_fates|!talent.bloodbath.enabled|!cooldown.bloodbath.remains|cooldown.bloodbath.remains>=10)
			if not 0 > 0 and not Talent(dragon_roar_talent) and { not HasEquippedItem(convergence_of_fates) or not Talent(bloodbath_talent) or not SpellCooldown(bloodbath) > 0 or SpellCooldown(bloodbath) >= 10 } Spell(battle_cry)
			#battle_cry,if=gcd.remains=0&buff.dragon_roar.up&(cooldown.bloodthirst.remains=0|buff.enrage.remains>cooldown.bloodthirst.remains)
			if not 0 > 0 and BuffPresent(dragon_roar_buff) and { not SpellCooldown(bloodthirst) > 0 or EnrageRemaining() > SpellCooldown(bloodthirst) } Spell(battle_cry)
			#avatar,if=buff.battle_cry.up|(target.time_to_die<(cooldown.battle_cry.remains+10))
			if BuffPresent(battle_cry_buff) or target.TimeToDie() < SpellCooldown(battle_cry) + 10 Spell(avatar)
			#blood_fury,if=buff.battle_cry.up
			if BuffPresent(battle_cry_buff) Spell(blood_fury_ap)
			#berserking,if=buff.battle_cry.up
			if BuffPresent(battle_cry_buff) Spell(berserking)
			#arcane_torrent,if=rage<rage.max-40
			if Rage() < MaxRage() - 40 Spell(arcane_torrent_rage)
			#call_action_list,name=cooldowns,if=buff.battle_cry.up
			if BuffPresent(battle_cry_buff) FuryCooldownsCdActions()

			unless BuffPresent(battle_cry_buff) and FuryCooldownsCdPostConditions()
			{
				#call_action_list,name=aoe,if=spell_targets.whirlwind>3
				if Enemies() > 3 FuryAoeCdActions()

				unless Enemies() > 3 and FuryAoeCdPostConditions()
				{
					#call_action_list,name=execute,if=target.health.pct<20
					if target.HealthPercent() < 20 FuryExecuteCdActions()

					unless target.HealthPercent() < 20 and FuryExecuteCdPostConditions()
					{
						#call_action_list,name=single_target,if=target.health.pct>20
						if target.HealthPercent() > 20 FurySingleTargetCdActions()
					}
				}
			}
		}
	}
}

AddFunction FuryDefaultCdPostConditions
{
	target.Distance() > 5 and FuryMovementCdPostConditions() or { HasEquippedItem(convergence_of_fates) and SpellCooldown(battle_cry) < 2 or not HasEquippedItem(convergence_of_fates) and { SpellCooldown(battle_cry) > 10 or SpellCooldown(battle_cry) < 2 } } and Spell(dragon_roar) or BuffPresent(battle_cry_buff) and FuryCooldownsCdPostConditions() or Enemies() > 3 and FuryAoeCdPostConditions() or target.HealthPercent() < 20 and FuryExecuteCdPostConditions() or target.HealthPercent() > 20 and FurySingleTargetCdPostConditions()
}

### actions.aoe

AddFunction FuryAoeMainActions
{
	#bloodthirst,if=buff.enrage.down|rage<50
	if not IsEnraged() or Rage() < 50 Spell(bloodthirst)
	#whirlwind,if=buff.meat_cleaver.down
	if BuffExpires(meat_cleaver_buff) Spell(whirlwind)
	#execute,if=spell_targets.whirlwind<6&talent.massacre.enabled&!buff.massacre.react
	if Enemies() < 6 and Talent(massacre_talent) and not BuffPresent(massacre_buff) Spell(execute)
	#rampage,if=buff.meat_cleaver.up&(buff.enrage.down&!talent.frothing_berserker.enabled|buff.massacre.react|rage>=100)
	if BuffPresent(meat_cleaver_buff) and { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } Spell(rampage)
	#bloodthirst
	Spell(bloodthirst)
	#whirlwind
	Spell(whirlwind)
}

AddFunction FuryAoeMainPostConditions
{
}

AddFunction FuryAoeShortCdActions
{
	unless { not IsEnraged() or Rage() < 50 } and Spell(bloodthirst)
	{
		#bladestorm,if=raid_event.adds.in>90|!raid_event.adds.exists|spell_targets.bladestorm_mh>1
		if 600 > 90 or not False(raid_event_adds_exists) or Enemies() > 1 Spell(bladestorm_fury)
	}
}

AddFunction FuryAoeShortCdPostConditions
{
	{ not IsEnraged() or Rage() < 50 } and Spell(bloodthirst) or BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or Enemies() < 6 and Talent(massacre_talent) and not BuffPresent(massacre_buff) and Spell(execute) or BuffPresent(meat_cleaver_buff) and { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } and Spell(rampage) or Spell(bloodthirst) or Spell(whirlwind)
}

AddFunction FuryAoeCdActions
{
}

AddFunction FuryAoeCdPostConditions
{
	{ not IsEnraged() or Rage() < 50 } and Spell(bloodthirst) or { 600 > 90 or not False(raid_event_adds_exists) or Enemies() > 1 } and Spell(bladestorm_fury) or BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or Enemies() < 6 and Talent(massacre_talent) and not BuffPresent(massacre_buff) and Spell(execute) or BuffPresent(meat_cleaver_buff) and { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } and Spell(rampage) or Spell(bloodthirst) or Spell(whirlwind)
}

### actions.cooldowns

AddFunction FuryCooldownsMainActions
{
	#rampage,if=talent.massacre.enabled&buff.massacre.react&buff.enrage.remains<1
	if Talent(massacre_talent) and BuffPresent(massacre_buff) and EnrageRemaining() < 1 Spell(rampage)
	#bloodthirst,if=target.health.pct<20&buff.enrage.remains<1
	if target.HealthPercent() < 20 and EnrageRemaining() < 1 Spell(bloodthirst)
	#execute,if=equipped.draught_of_souls&cooldown.draught_of_souls.remains<1&buff.juggernaut.remains<3
	if HasEquippedItem(draught_of_souls) and SpellCooldown(draught_of_souls) < 1 and BuffRemaining(juggernaut_buff) < 3 Spell(execute)
	#odyns_fury,if=spell_targets.odyns_fury>1
	if Enemies() > 1 Spell(odyns_fury)
	#whirlwind,if=spell_targets.whirlwind>1&buff.meat_cleaver.down
	if Enemies() > 1 and BuffExpires(meat_cleaver_buff) Spell(whirlwind)
	#execute
	Spell(execute)
	#raging_blow,if=talent.inner_rage.enabled&buff.enrage.up
	if Talent(inner_rage_talent) and IsEnraged() Spell(raging_blow)
	#rampage,if=!talent.frothing_berserker.enabled|(talent.frothing_berserker.enabled&rage>=100)
	if not Talent(frothing_berserker_talent) or Talent(frothing_berserker_talent) and Rage() >= 100 Spell(rampage)
	#bloodthirst,if=buff.enrage.remains<1&!talent.outburst.enabled
	if EnrageRemaining() < 1 and not Talent(outburst_talent) Spell(bloodthirst)
	#raging_blow,if=talent.inner_rage.enabled
	if Talent(inner_rage_talent) Spell(raging_blow)
	#odyns_fury
	Spell(odyns_fury)
	#whirlwind,if=buff.wrecking_ball.react&buff.enrage.up
	if BuffPresent(wrecking_ball_buff) and IsEnraged() Spell(whirlwind)
	#raging_blow,if=!talent.inner_rage.enabled
	if not Talent(inner_rage_talent) Spell(raging_blow)
	#bloodthirst
	Spell(bloodthirst)
	#furious_slash
	Spell(furious_slash)
}

AddFunction FuryCooldownsMainPostConditions
{
}

AddFunction FuryCooldownsShortCdActions
{
	unless Talent(massacre_talent) and BuffPresent(massacre_buff) and EnrageRemaining() < 1 and Spell(rampage) or target.HealthPercent() < 20 and EnrageRemaining() < 1 and Spell(bloodthirst) or HasEquippedItem(draught_of_souls) and SpellCooldown(draught_of_souls) < 1 and BuffRemaining(juggernaut_buff) < 3 and Spell(execute) or Enemies() > 1 and Spell(odyns_fury) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or Spell(execute) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or { not Talent(frothing_berserker_talent) or Talent(frothing_berserker_talent) and Rage() >= 100 } and Spell(rampage)
	{
		#berserker_rage,if=talent.outburst.enabled&buff.enrage.down&buff.battle_cry.up
		if Talent(outburst_talent) and not IsEnraged() and BuffPresent(battle_cry_buff) Spell(berserker_rage)
	}
}

AddFunction FuryCooldownsShortCdPostConditions
{
	Talent(massacre_talent) and BuffPresent(massacre_buff) and EnrageRemaining() < 1 and Spell(rampage) or target.HealthPercent() < 20 and EnrageRemaining() < 1 and Spell(bloodthirst) or HasEquippedItem(draught_of_souls) and SpellCooldown(draught_of_souls) < 1 and BuffRemaining(juggernaut_buff) < 3 and Spell(execute) or Enemies() > 1 and Spell(odyns_fury) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or Spell(execute) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or { not Talent(frothing_berserker_talent) or Talent(frothing_berserker_talent) and Rage() >= 100 } and Spell(rampage) or EnrageRemaining() < 1 and not Talent(outburst_talent) and Spell(bloodthirst) or Talent(inner_rage_talent) and Spell(raging_blow) or Spell(odyns_fury) or BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or not Talent(inner_rage_talent) and Spell(raging_blow) or Spell(bloodthirst) or Spell(furious_slash)
}

AddFunction FuryCooldownsCdActions
{
}

AddFunction FuryCooldownsCdPostConditions
{
	Talent(massacre_talent) and BuffPresent(massacre_buff) and EnrageRemaining() < 1 and Spell(rampage) or target.HealthPercent() < 20 and EnrageRemaining() < 1 and Spell(bloodthirst) or HasEquippedItem(draught_of_souls) and SpellCooldown(draught_of_souls) < 1 and BuffRemaining(juggernaut_buff) < 3 and Spell(execute) or Enemies() > 1 and Spell(odyns_fury) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or Spell(execute) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or { not Talent(frothing_berserker_talent) or Talent(frothing_berserker_talent) and Rage() >= 100 } and Spell(rampage) or EnrageRemaining() < 1 and not Talent(outburst_talent) and Spell(bloodthirst) or Talent(inner_rage_talent) and Spell(raging_blow) or Spell(odyns_fury) or BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or not Talent(inner_rage_talent) and Spell(raging_blow) or Spell(bloodthirst) or Spell(furious_slash)
}

### actions.execute

AddFunction FuryExecuteMainActions
{
	#bloodthirst,if=buff.fujiedas_fury.up&buff.fujiedas_fury.remains<2
	if BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 Spell(bloodthirst)
	#execute,if=artifact.juggernaut.enabled&(!buff.juggernaut.up|buff.juggernaut.remains<2)|buff.stone_heart.react
	if HasArtifactTrait(juggernaut) and { not BuffPresent(juggernaut_buff) or BuffRemaining(juggernaut_buff) < 2 } or BuffPresent(stone_heart_buff) Spell(execute)
	#furious_slash,if=talent.frenzy.enabled&buff.frenzy.remains<=2
	if Talent(frenzy_talent) and BuffRemaining(frenzy_buff) <= 2 Spell(furious_slash)
	#rampage,if=buff.massacre.react&buff.enrage.remains<1
	if BuffPresent(massacre_buff) and EnrageRemaining() < 1 Spell(rampage)
	#execute
	Spell(execute)
	#bloodthirst
	Spell(bloodthirst)
	#whirlwind,if=spell_targets.whirlwind=3&buff.wrecking_ball.react&buff.enrage.up
	if Enemies() == 3 and BuffPresent(wrecking_ball_buff) and IsEnraged() Spell(whirlwind)
	#furious_slash,if=set_bonus.tier19_2pc
	if ArmorSetBonus(T19 2) Spell(furious_slash)
	#raging_blow
	Spell(raging_blow)
	#furious_slash
	Spell(furious_slash)
}

AddFunction FuryExecuteMainPostConditions
{
}

AddFunction FuryExecuteShortCdActions
{
}

AddFunction FuryExecuteShortCdPostConditions
{
	BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 and Spell(bloodthirst) or { HasArtifactTrait(juggernaut) and { not BuffPresent(juggernaut_buff) or BuffRemaining(juggernaut_buff) < 2 } or BuffPresent(stone_heart_buff) } and Spell(execute) or Talent(frenzy_talent) and BuffRemaining(frenzy_buff) <= 2 and Spell(furious_slash) or BuffPresent(massacre_buff) and EnrageRemaining() < 1 and Spell(rampage) or Spell(execute) or Spell(bloodthirst) or Enemies() == 3 and BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or ArmorSetBonus(T19 2) and Spell(furious_slash) or Spell(raging_blow) or Spell(furious_slash)
}

AddFunction FuryExecuteCdActions
{
}

AddFunction FuryExecuteCdPostConditions
{
	BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 and Spell(bloodthirst) or { HasArtifactTrait(juggernaut) and { not BuffPresent(juggernaut_buff) or BuffRemaining(juggernaut_buff) < 2 } or BuffPresent(stone_heart_buff) } and Spell(execute) or Talent(frenzy_talent) and BuffRemaining(frenzy_buff) <= 2 and Spell(furious_slash) or BuffPresent(massacre_buff) and EnrageRemaining() < 1 and Spell(rampage) or Spell(execute) or Spell(bloodthirst) or Enemies() == 3 and BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or ArmorSetBonus(T19 2) and Spell(furious_slash) or Spell(raging_blow) or Spell(furious_slash)
}

### actions.movement

AddFunction FuryMovementMainActions
{
}

AddFunction FuryMovementMainPostConditions
{
}

AddFunction FuryMovementShortCdActions
{
	#heroic_leap
	if CheckBoxOn(opt_melee_range) and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)
}

AddFunction FuryMovementShortCdPostConditions
{
}

AddFunction FuryMovementCdActions
{
}

AddFunction FuryMovementCdPostConditions
{
}

### actions.precombat

AddFunction FuryPrecombatMainActions
{
}

AddFunction FuryPrecombatMainPostConditions
{
}

AddFunction FuryPrecombatShortCdActions
{
}

AddFunction FuryPrecombatShortCdPostConditions
{
}

AddFunction FuryPrecombatCdActions
{
	#flask,type=countless_armies
	#food,type=azshari_salad
	#augmentation,type=defiled
	#snapshot_stats
	#potion,name=old_war
	if CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(old_war_potion usable=1)
}

AddFunction FuryPrecombatCdPostConditions
{
}

### actions.single_target

AddFunction FurySingleTargetMainActions
{
	#bloodthirst,if=buff.fujiedas_fury.up&buff.fujiedas_fury.remains<2
	if BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 Spell(bloodthirst)
	#furious_slash,if=talent.frenzy.enabled&(buff.frenzy.down|buff.frenzy.remains<=2)
	if Talent(frenzy_talent) and { BuffExpires(frenzy_buff) or BuffRemaining(frenzy_buff) <= 2 } Spell(furious_slash)
	#whirlwind,if=spell_targets.whirlwind=3&buff.wrecking_ball.react
	if Enemies() == 3 and BuffPresent(wrecking_ball_buff) Spell(whirlwind)
	#raging_blow,if=talent.inner_rage.enabled&buff.enrage.up
	if Talent(inner_rage_talent) and IsEnraged() Spell(raging_blow)
	#whirlwind,if=spell_targets.whirlwind>1&buff.meat_cleaver.down
	if Enemies() > 1 and BuffExpires(meat_cleaver_buff) Spell(whirlwind)
	#rampage,if=(buff.enrage.down&!talent.frothing_berserker.enabled)|buff.massacre.react|rage>=100
	if not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 Spell(rampage)
	#raging_blow,if=talent.inner_rage.enabled
	if Talent(inner_rage_talent) Spell(raging_blow)
	#execute,if=buff.stone_heart.react
	if BuffPresent(stone_heart_buff) Spell(execute)
	#whirlwind,if=buff.wrecking_ball.react&buff.enrage.up
	if BuffPresent(wrecking_ball_buff) and IsEnraged() Spell(whirlwind)
	#bloodthirst
	Spell(bloodthirst)
	#raging_blow,if=!set_bonus.tier19_2pc&!talent.inner_rage.enabled
	if not ArmorSetBonus(T19 2) and not Talent(inner_rage_talent) Spell(raging_blow)
	#whirlwind,if=spell_targets.whirlwind>2
	if Enemies() > 2 Spell(whirlwind)
	#furious_slash
	Spell(furious_slash)
}

AddFunction FurySingleTargetMainPostConditions
{
}

AddFunction FurySingleTargetShortCdActions
{
	unless BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 and Spell(bloodthirst) or Talent(frenzy_talent) and { BuffExpires(frenzy_buff) or BuffRemaining(frenzy_buff) <= 2 } and Spell(furious_slash) or Enemies() == 3 and BuffPresent(wrecking_ball_buff) and Spell(whirlwind) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } and Spell(rampage) or Talent(inner_rage_talent) and Spell(raging_blow) or BuffPresent(stone_heart_buff) and Spell(execute) or BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind)
	{
		#bladestorm,if=buff.enrage.remains>2&(raid_event.adds.in>90|!raid_event.adds.exists|spell_targets.bladestorm_mh>1)
		if EnrageRemaining() > 2 and { 600 > 90 or not False(raid_event_adds_exists) or Enemies() > 1 } Spell(bladestorm_fury)
	}
}

AddFunction FurySingleTargetShortCdPostConditions
{
	BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 and Spell(bloodthirst) or Talent(frenzy_talent) and { BuffExpires(frenzy_buff) or BuffRemaining(frenzy_buff) <= 2 } and Spell(furious_slash) or Enemies() == 3 and BuffPresent(wrecking_ball_buff) and Spell(whirlwind) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } and Spell(rampage) or Talent(inner_rage_talent) and Spell(raging_blow) or BuffPresent(stone_heart_buff) and Spell(execute) or BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or Spell(bloodthirst) or not ArmorSetBonus(T19 2) and not Talent(inner_rage_talent) and Spell(raging_blow) or Enemies() > 2 and Spell(whirlwind) or Spell(furious_slash)
}

AddFunction FurySingleTargetCdActions
{
}

AddFunction FurySingleTargetCdPostConditions
{
	BuffPresent(fujiedas_fury_buff) and BuffRemaining(fujiedas_fury_buff) < 2 and Spell(bloodthirst) or Talent(frenzy_talent) and { BuffExpires(frenzy_buff) or BuffRemaining(frenzy_buff) <= 2 } and Spell(furious_slash) or Enemies() == 3 and BuffPresent(wrecking_ball_buff) and Spell(whirlwind) or Talent(inner_rage_talent) and IsEnraged() and Spell(raging_blow) or Enemies() > 1 and BuffExpires(meat_cleaver_buff) and Spell(whirlwind) or { not IsEnraged() and not Talent(frothing_berserker_talent) or BuffPresent(massacre_buff) or Rage() >= 100 } and Spell(rampage) or Talent(inner_rage_talent) and Spell(raging_blow) or BuffPresent(stone_heart_buff) and Spell(execute) or BuffPresent(wrecking_ball_buff) and IsEnraged() and Spell(whirlwind) or EnrageRemaining() > 2 and { 600 > 90 or not False(raid_event_adds_exists) or Enemies() > 1 } and Spell(bladestorm_fury) or Spell(bloodthirst) or not ArmorSetBonus(T19 2) and not Talent(inner_rage_talent) and Spell(raging_blow) or Enemies() > 2 and Spell(whirlwind) or Spell(furious_slash)
}

### Fury icons.

AddCheckBox(opt_warrior_fury_aoe L(AOE) default specialization=fury)

AddIcon checkbox=!opt_warrior_fury_aoe enemies=1 help=shortcd specialization=fury
{
	if not InCombat() FuryPrecombatShortCdActions()
	unless not InCombat() and FuryPrecombatShortCdPostConditions()
	{
		FuryDefaultShortCdActions()
	}
}

AddIcon checkbox=opt_warrior_fury_aoe help=shortcd specialization=fury
{
	if not InCombat() FuryPrecombatShortCdActions()
	unless not InCombat() and FuryPrecombatShortCdPostConditions()
	{
		FuryDefaultShortCdActions()
	}
}

AddIcon enemies=1 help=main specialization=fury
{
	if not InCombat() FuryPrecombatMainActions()
	unless not InCombat() and FuryPrecombatMainPostConditions()
	{
		FuryDefaultMainActions()
	}
}

AddIcon checkbox=opt_warrior_fury_aoe help=aoe specialization=fury
{
	if not InCombat() FuryPrecombatMainActions()
	unless not InCombat() and FuryPrecombatMainPostConditions()
	{
		FuryDefaultMainActions()
	}
}

AddIcon checkbox=!opt_warrior_fury_aoe enemies=1 help=cd specialization=fury
{
	if not InCombat() FuryPrecombatCdActions()
	unless not InCombat() and FuryPrecombatCdPostConditions()
	{
		FuryDefaultCdActions()
	}
}

AddIcon checkbox=opt_warrior_fury_aoe help=cd specialization=fury
{
	if not InCombat() FuryPrecombatCdActions()
	unless not InCombat() and FuryPrecombatCdPostConditions()
	{
		FuryDefaultCdActions()
	}
}

### Required symbols
# arcane_torrent_rage
# avatar
# battle_cry
# battle_cry_buff
# berserker_rage
# berserking
# bladestorm_fury
# blood_fury_ap
# bloodbath
# bloodbath_talent
# bloodthirst
# charge
# convergence_of_fates
# dragon_roar
# dragon_roar_buff
# dragon_roar_talent
# draught_of_souls
# execute
# frenzy_buff
# frenzy_talent
# frothing_berserker_talent
# fujiedas_fury_buff
# furious_slash
# heroic_leap
# inner_rage_talent
# intimidating_shout
# juggernaut
# juggernaut_buff
# massacre_buff
# massacre_talent
# meat_cleaver_buff
# odyns_fury
# old_war_potion
# outburst_talent
# pummel
# quaking_palm
# raging_blow
# rampage
# shockwave
# stone_heart_buff
# storm_bolt
# war_stomp
# whirlwind
# wrecking_ball_buff
`;
    OvaleScripts.RegisterScript("WARRIOR", "fury", name, desc, code, "script");
}
{
    let name = "simulationcraft_warrior_protection_t19p";
    let desc = "[7.0] SimulationCraft: Warrior_Protection_T19P";
    let code = `
# Based on SimulationCraft profile "Warrior_Protection_T19P".
#	class=warrior
#	spec=protection
#	talents=1222312

Include(ovale_common)
Include(ovale_trinkets_mop)
Include(ovale_trinkets_wod)
Include(ovale_warrior_spells)

AddCheckBox(opt_interrupt L(interrupt) default specialization=protection)
AddCheckBox(opt_melee_range L(not_in_melee_range) specialization=protection)
AddCheckBox(opt_use_consumables L(opt_use_consumables) default specialization=protection)

AddFunction ProtectionInterruptActions
{
	if CheckBoxOn(opt_interrupt) and not target.IsFriend() and target.Casting()
	{
		if target.InRange(pummel) and target.IsInterruptible() Spell(pummel)
		if target.InRange(storm_bolt) and not target.Classification(worldboss) Spell(storm_bolt)
		if target.InRange(intercept) and not target.Classification(worldboss) and Talent(warbringer_talent) Spell(intercept)
		if target.Distance(less 10) and not target.Classification(worldboss) Spell(shockwave)
		if target.Distance(less 8) and target.IsInterruptible() Spell(arcane_torrent_rage)
		if target.InRange(quaking_palm) and not target.Classification(worldboss) Spell(quaking_palm)
		if target.Distance(less 5) and not target.Classification(worldboss) Spell(war_stomp)
		if target.InRange(intimidating_shout) and not target.Classification(worldboss) Spell(intimidating_shout)
	}
}

AddFunction ProtectionGetInMeleeRange
{
	if CheckBoxOn(opt_melee_range) and not InFlightToTarget(intercept) and not InFlightToTarget(heroic_leap)
	{
		if target.InRange(intercept) Spell(intercept)
		if SpellCharges(intercept) == 0 and target.Distance(atLeast 8) and target.Distance(atMost 40) Spell(heroic_leap)
		if not target.InRange(pummel) Texture(misc_arrowlup help=L(not_in_melee_range))
	}
}

### actions.default

AddFunction ProtectionDefaultMainActions
{
	#call_action_list,name=prot
	ProtectionProtMainActions()
}

AddFunction ProtectionDefaultMainPostConditions
{
	ProtectionProtMainPostConditions()
}

AddFunction ProtectionDefaultShortCdActions
{
	#auto_attack
	ProtectionGetInMeleeRange()

	unless Spell(intercept)
	{
		#call_action_list,name=prot
		ProtectionProtShortCdActions()
	}
}

AddFunction ProtectionDefaultShortCdPostConditions
{
	Spell(intercept) or ProtectionProtShortCdPostConditions()
}

AddFunction ProtectionDefaultCdActions
{
	#pummel
	ProtectionInterruptActions()

	unless Spell(intercept)
	{
		#blood_fury
		Spell(blood_fury_ap)
		#berserking
		Spell(berserking)
		#arcane_torrent
		Spell(arcane_torrent_rage)
		#call_action_list,name=prot
		ProtectionProtCdActions()
	}
}

AddFunction ProtectionDefaultCdPostConditions
{
	Spell(intercept) or ProtectionProtCdPostConditions()
}

### actions.precombat

AddFunction ProtectionPrecombatMainActions
{
}

AddFunction ProtectionPrecombatMainPostConditions
{
}

AddFunction ProtectionPrecombatShortCdActions
{
}

AddFunction ProtectionPrecombatShortCdPostConditions
{
}

AddFunction ProtectionPrecombatCdActions
{
	#flask,type=ten_thousand_scars
	#food,type=azshari_salad
	#augmentation,type=defiled
	#snapshot_stats
	#potion,name=unbending_potion
	if CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(unbending_potion usable=1)
}

AddFunction ProtectionPrecombatCdPostConditions
{
}

### actions.prot

AddFunction ProtectionProtMainActions
{
	#spell_reflection,if=incoming_damage_2500ms>health.max*0.20
	if IncomingDamage(2.5) > MaxHealth() * 0.2 Spell(spell_reflection)
	#shield_slam,if=(!(cooldown.shield_block.remains<=gcd.max*2&!buff.shield_block.up)&talent.heavy_repercussions.enabled)|!talent.heavy_repercussions.enabled
	if not { SpellCooldown(shield_block) <= GCD() * 2 and not BuffPresent(shield_block_buff) } and Talent(heavy_repercussions_talent) or not Talent(heavy_repercussions_talent) Spell(shield_slam)
	#thunder_clap
	Spell(thunder_clap)
	#revenge,if=(talent.vengeance.enabled&buff.revenge.react&!buff.vengeance_ignore_pain.up)|(buff.vengeance_revenge.up&rage>=59)|(talent.vengeance.enabled&!buff.vengeance_ignore_pain.up&!buff.vengeance_revenge.up&rage>=69)|(!talent.vengeance.enabled&buff.revenge.react)
	if Talent(vengeance_talent) and BuffPresent(revenge_buff) and not BuffPresent(vengeance_ignore_pain_buff) or BuffPresent(vengeance_revenge_buff) and Rage() >= 59 or Talent(vengeance_talent) and not BuffPresent(vengeance_ignore_pain_buff) and not BuffPresent(vengeance_revenge_buff) and Rage() >= 69 or not Talent(vengeance_talent) and BuffPresent(revenge_buff) Spell(revenge)
	#devastate
	Spell(devastate)
}

AddFunction ProtectionProtMainPostConditions
{
}

AddFunction ProtectionProtShortCdActions
{
	unless IncomingDamage(2.5) > MaxHealth() * 0.2 and Spell(spell_reflection)
	{
		#demoralizing_shout,if=incoming_damage_2500ms>health.max*0.20&!talent.booming_voice.enabled
		if IncomingDamage(2.5) > MaxHealth() * 0.2 and not Talent(booming_voice_talent) Spell(demoralizing_shout)
		#demoralizing_shout,if=talent.booming_voice.enabled&buff.battle_cry.up
		if Talent(booming_voice_talent) and BuffPresent(battle_cry_buff) Spell(demoralizing_shout)
		#ravager,if=talent.ravager.enabled&buff.battle_cry.up
		if Talent(ravager_talent) and BuffPresent(battle_cry_buff) Spell(ravager)
		#neltharions_fury,if=!buff.shield_block.up&cooldown.shield_block.remains>3&((cooldown.shield_slam.remains>3&talent.heavy_repercussions.enabled)|(!talent.heavy_repercussions.enabled))
		if not BuffPresent(shield_block_buff) and SpellCooldown(shield_block) > 3 and { SpellCooldown(shield_slam) > 3 and Talent(heavy_repercussions_talent) or not Talent(heavy_repercussions_talent) } Spell(neltharions_fury)
		#shield_block,if=!buff.neltharions_fury.up&((cooldown.shield_slam.remains=0&talent.heavy_repercussions.enabled)|action.shield_block.charges=2|!talent.heavy_repercussions.enabled)
		if not BuffPresent(neltharions_fury_buff) and { not SpellCooldown(shield_slam) > 0 and Talent(heavy_repercussions_talent) or Charges(shield_block) == 2 or not Talent(heavy_repercussions_talent) } Spell(shield_block)
		#ignore_pain,if=(rage>=60&!talent.vengeance.enabled)|(buff.vengeance_ignore_pain.up&rage>=39)|(talent.vengeance.enabled&!buff.vengeance_ignore_pain.up&!buff.vengeance_revenge.up&rage<30&!buff.revenge.react)
		if Rage() >= 60 and not Talent(vengeance_talent) or BuffPresent(vengeance_ignore_pain_buff) and Rage() >= 39 or Talent(vengeance_talent) and not BuffPresent(vengeance_ignore_pain_buff) and not BuffPresent(vengeance_revenge_buff) and Rage() < 30 and not BuffPresent(revenge_buff) Spell(ignore_pain)
	}
}

AddFunction ProtectionProtShortCdPostConditions
{
	IncomingDamage(2.5) > MaxHealth() * 0.2 and Spell(spell_reflection) or { not { SpellCooldown(shield_block) <= GCD() * 2 and not BuffPresent(shield_block_buff) } and Talent(heavy_repercussions_talent) or not Talent(heavy_repercussions_talent) } and Spell(shield_slam) or Spell(thunder_clap) or { Talent(vengeance_talent) and BuffPresent(revenge_buff) and not BuffPresent(vengeance_ignore_pain_buff) or BuffPresent(vengeance_revenge_buff) and Rage() >= 59 or Talent(vengeance_talent) and not BuffPresent(vengeance_ignore_pain_buff) and not BuffPresent(vengeance_revenge_buff) and Rage() >= 69 or not Talent(vengeance_talent) and BuffPresent(revenge_buff) } and Spell(revenge) or Spell(devastate)
}

AddFunction ProtectionProtCdActions
{
	unless IncomingDamage(2.5) > MaxHealth() * 0.2 and Spell(spell_reflection)
	{
		#last_stand,if=incoming_damage_2500ms>health.max*0.40
		if IncomingDamage(2.5) > MaxHealth() * 0.4 Spell(last_stand)
		#shield_wall,if=incoming_damage_2500ms>health.max*0.40&!cooldown.last_stand.remains=0
		if IncomingDamage(2.5) > MaxHealth() * 0.4 and not { not SpellCooldown(last_stand) > 0 } Spell(shield_wall)
		#potion,name=unbending_potion,if=(incoming_damage_2500ms>health.max*0.15&!buff.potion.up)|target.time_to_die<=25
		if { IncomingDamage(2.5) > MaxHealth() * 0.15 and not BuffPresent(potion_buff) or target.TimeToDie() <= 25 } and CheckBoxOn(opt_use_consumables) and target.Classification(worldboss) Item(unbending_potion usable=1)
		#battle_cry,if=cooldown.shield_slam.remains=0
		if not SpellCooldown(shield_slam) > 0 Spell(battle_cry)
	}
}

AddFunction ProtectionProtCdPostConditions
{
	IncomingDamage(2.5) > MaxHealth() * 0.2 and Spell(spell_reflection) or Talent(ravager_talent) and BuffPresent(battle_cry_buff) and Spell(ravager) or not BuffPresent(shield_block_buff) and SpellCooldown(shield_block) > 3 and { SpellCooldown(shield_slam) > 3 and Talent(heavy_repercussions_talent) or not Talent(heavy_repercussions_talent) } and Spell(neltharions_fury) or { not { SpellCooldown(shield_block) <= GCD() * 2 and not BuffPresent(shield_block_buff) } and Talent(heavy_repercussions_talent) or not Talent(heavy_repercussions_talent) } and Spell(shield_slam) or Spell(thunder_clap) or { Talent(vengeance_talent) and BuffPresent(revenge_buff) and not BuffPresent(vengeance_ignore_pain_buff) or BuffPresent(vengeance_revenge_buff) and Rage() >= 59 or Talent(vengeance_talent) and not BuffPresent(vengeance_ignore_pain_buff) and not BuffPresent(vengeance_revenge_buff) and Rage() >= 69 or not Talent(vengeance_talent) and BuffPresent(revenge_buff) } and Spell(revenge) or Spell(devastate)
}

### Protection icons.

AddCheckBox(opt_warrior_protection_aoe L(AOE) default specialization=protection)

AddIcon checkbox=!opt_warrior_protection_aoe enemies=1 help=shortcd specialization=protection
{
	if not InCombat() ProtectionPrecombatShortCdActions()
	unless not InCombat() and ProtectionPrecombatShortCdPostConditions()
	{
		ProtectionDefaultShortCdActions()
	}
}

AddIcon checkbox=opt_warrior_protection_aoe help=shortcd specialization=protection
{
	if not InCombat() ProtectionPrecombatShortCdActions()
	unless not InCombat() and ProtectionPrecombatShortCdPostConditions()
	{
		ProtectionDefaultShortCdActions()
	}
}

AddIcon enemies=1 help=main specialization=protection
{
	if not InCombat() ProtectionPrecombatMainActions()
	unless not InCombat() and ProtectionPrecombatMainPostConditions()
	{
		ProtectionDefaultMainActions()
	}
}

AddIcon checkbox=opt_warrior_protection_aoe help=aoe specialization=protection
{
	if not InCombat() ProtectionPrecombatMainActions()
	unless not InCombat() and ProtectionPrecombatMainPostConditions()
	{
		ProtectionDefaultMainActions()
	}
}

AddIcon checkbox=!opt_warrior_protection_aoe enemies=1 help=cd specialization=protection
{
	if not InCombat() ProtectionPrecombatCdActions()
	unless not InCombat() and ProtectionPrecombatCdPostConditions()
	{
		ProtectionDefaultCdActions()
	}
}

AddIcon checkbox=opt_warrior_protection_aoe help=cd specialization=protection
{
	if not InCombat() ProtectionPrecombatCdActions()
	unless not InCombat() and ProtectionPrecombatCdPostConditions()
	{
		ProtectionDefaultCdActions()
	}
}

### Required symbols
# arcane_torrent_rage
# battle_cry
# battle_cry_buff
# berserking
# blood_fury_ap
# booming_voice_talent
# demoralizing_shout
# devastate
# heavy_repercussions_talent
# heroic_leap
# ignore_pain
# intercept
# intimidating_shout
# last_stand
# neltharions_fury
# neltharions_fury_buff
# potion_buff
# pummel
# quaking_palm
# ravager
# ravager_talent
# revenge
# revenge_buff
# shield_block
# shield_block_buff
# shield_slam
# shield_wall
# shockwave
# spell_reflection
# storm_bolt
# thunder_clap
# unbending_potion
# vengeance_ignore_pain_buff
# vengeance_revenge_buff
# vengeance_talent
# war_stomp
# warbringer_talent
`;
    OvaleScripts.RegisterScript("WARRIOR", "protection", name, desc, code, "script");
}
