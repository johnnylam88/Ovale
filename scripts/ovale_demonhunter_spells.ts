import __addon from "addon";
let [OVALE, Ovale] = __addon;
import { OvaleScripts } from "./OvaleScripts";
{
    let name = "ovale_demonhunter_spells";
    let desc = "[7.0] Ovale: DemonHunter spells";
    let code = `

ItemRequire(shifting_cosmic_sliver unusable 1=oncooldown,!metamorphosis_veng,buff,!metamorphosis_veng_buff)	

Define(abyssal_strike_talent 1)
Define(agonizing_flames_talent 2)
Define(anguish_of_the_deceiver 201473)
Define(annihilation 201427)
	SpellInfo(annihilation fury=40)
Define(blade_dance 188499)
	SpellInfo(blade_dance replace death_sweep=buff,metamorphosis_havoc_buff)
	SpellInfo(blade_dance fury=35 cd=10 cd_haste=melee)
	SpellInfo(blade_dance fury=15 talent=first_blood_talent)
Define(blade_turning_buff 247253)
Define(blind_fury_talent 3)
Define(bloodlet_talent 9)
Define(blur 198589)
	SpellInfo(blur cd=60)
Define(burning_alive_talent 6)
Define(chaos_blades 247938)
	SpellInfo(chaos_blades cd=120)
Define(chaos_blades_buff 247938)
	SpellInfo(chaos_blades_buff duration=12)
Define(chaos_blades_talent 19)
Define(chaos_cleave_talent 7)
Define(chaos_nova 179057)
	SpellInfo(chaos_nova cd=60 fury=30)
	SpellInfo(chaos_nova cd=40 fury=0 talent=unleashed_power_talent)
	SpellAddBuff(chaos_nova chaos_nova_debuff=1)
Define(chaos_nova_debuff 179057)
	SpellInfo(chaos_nova_debuff duration=5)
Define(chaos_strike 162794)
	SpellInfo(chaos_strike replace annihilation=buff,metamorphosis_havoc_buff)
	SpellInfo(chaos_strike fury=40)
Define(concentrated_sigils_talent 13)
Define(consume_magic 183752)
	SpellInfo(consume_magic cd=15 gcd=0 interrupt=1 offgcd=1)
Define(death_sweep 210152)
	SpellInfo(death_sweep fury=35 cd=10 cd_haste=melee)
	SpellInfo(death_sweep fury=15 talent=first_blood_talent)
Define(defensive_spikes 212829)
Define(demonic_appetite_talent 6)
Define(demonic_talent 21)
Define(demon_blades_talent 5)
Define(demon_reborn_talent 18)
Define(demon_speed 201469)
Define(demon_spikes 203720)
	SpellInfo(demon_spikes tag=shortcd)
	SpellInfo(demon_spikes pain=20 cd_haste=melee haste=melee specialization=vengeance cd=15 gcd=0 offgcd=1 charges=2)
	SpellInfo(demon_spikes charges=3 if_equipped=oblivions_embrace)
	SpellAddBuff(demon_spikes demon_spikes_buff=1)
Define(demon_spikes_buff 203819)
	SpellInfo(demon_spikes_buff duration=6)
Define(demonic_infusion 236189)
	SpellInfo(demonic_infusion cd=90 pain=-60)
	SpellRequire(demonic_infusion pain_percent 120=buff,blade_turning_buff)
Define(demons_bite 162243)
	SpellInfo(demons_bite fury=-20)
	SpellInfo(demons_bite fury_percent=110 itemset=T19 itemcount=2)
Define(empower_wards 218256)
	SpellInfo(empower_wards tag=cd cd=20 gcd=0 offgcd=1 charges=1)
	SpellInfo(empower_wards charges=2 if_equipped=oblivions_embrace)
	SpellAddBuff(empower_wards empower_wards_buff=1)
Define(empower_wards_buff 218256)
	SpellInfo(empower_wards_buff duration=6)
Define(eye_beam 198013)
	SpellInfo(eye_beam fury=50)
	SpellInfo(eye_beam addfury=-5 pertrait=wide_eyes_trait)
Define(extended_by_demonic_buff -22547) # OvaleDemonHunterDemonic
Define(felblade 232893)
	SpellInfo(felblade cd=15 tag=main cd_haste=melee fury=-30 pain=-20)
	SpellInfo(felblade fury_percent=110 itemset=T19 itemcount=2)
	SpellRequire(felblade pain_percent 120=buff,blade_turning_buff)
Define(fel_barrage 211053)
	SpellInfo(fel_barrage cd=60 tag=main)
Define(fel_devastation 212084)
	SpellInfo(fel_devastation cd=60)
	SpellInfo(fel_devastation pain=30)
Define(fel_devastation_talent 16)
Define(fel_eruption 211881)
	SpellInfo(fel_eruption cd=30)
	SpellInfo(fel_eruption tag=main)
	SpellInfo(fel_eruption fury=20 specialization=havoc)
	SpellInfo(fel_eruption pain=10 specialization=vengeance)
Define(fel_eruption_talent 9)
Define(fel_mastery_talent 1)
Define(fel_rush 195072)
	SpellInfo(fel_rush tag=main)
Define(fiery_brand 204021)
	SpellInfo(fiery_brand cd=60 gcd=0 offgcd=1 tag=cd)
	SpellAddTargetDebuff(fiery_brand fiery_brand_debuff=1)
Define(fiery_brand_debuff 207771)
	SpellInfo(fiery_brand_debuff duration=8)
Define(fiery_demise 212817)
Define(fiery_demise_debuff 212818)
	SpellInfo(fiery_demise_debuff duration=8)
Define(first_blood_talent 8)
Define(flame_crash_talent 8)
Define(fracture 209795)	
	SpellInfo(fracture pain=30)
Define(fracture_talent 11)
Define(frailty_debuff 247456)
	SpellInfo(frailty_debuff duration=20)
Define(fury_of_the_illidari 201467)
	SpellInfo(fury_of_the_ilidari cd=60 tag=main)
Define(immolation_aura 178740)
	SpellAddBuff(immolation_aura immolation_aura_buff=1)
Define(immolation_aura_buff 201122)
	SpellInfo(immolation_aura_buff duration=6)
Define(imprison 217832)
Define(infernal_strike 189110)
	SpellInfo(infernal_strike cd=20 charges=2 offgcd=1)
Define(infernal_strike_debuff 189110)
Define(master_of_the_glaive_talent 16)
Define(metamorphosis_havoc 191427)
	SpellInfo(metamorphosis_havoc cd=300)
	SpellAddBuff(metamorphosis_havoc metamorphosis_havoc_buff=1)
Define(metamorphosis_havoc_buff 162264)
	SpellInfo(metamorphosis_havoc_buff duration=30)
Define(metamorphosis_veng 187827)
	SpellInfo(metamorphosis_veng cd=180 gcd=0 offgcd=1)
	SpellAddBuff(metamorphosis_veng metamorphosis_veng_buff=1)
Define(metamorphosis_veng_buff 187827)
	SpellInfo(metamorphosis_veng_buff duration=15)
Define(momentum_buff 208628)
Define(momentum_talent 13)
Define(nemesis 206491)
	SpellInfo(nemesis cd=120)
	SpellAddTargetDebuff(nemesis nemesis_debuff=1)
Define(nemesis_debuff 206491)
Define(nemesis_talent 15)
Define(oblivions_embrace 151799)
Define(pick_up_fragment 210788)
Define(prepared_buff 203650)
Define(prepared_talent 4)
Define(quickened_sigils_talent 15)
Define(razor_spikes_talent 3)
Define(sever 235964)
	SpellInfo(sever pain=-10)
	SpellRequire(sever pain_percent 120=buff,blade_turning_buff)
Define(shear 203782)
	SpellInfo(shear pain=-10)
	SpellInfo(shear replace sever=buff,metamorphosis_veng_buff)
	SpellRequire(shear pain_percent 120=buff,blade_turning_buff)
Define(sigil_of_chains 202138)
	SpellInfo(sigil_of_chains cd=90)
Define(sigil_of_flame 204596)
	SpellInfo(sigil_of_flame cd=30 tag=main)
	SpellInfo(sigil_of_flame cd=24 talent=quickened_sigils_talent)
Define(sigil_of_flame_debuff 204598)
	SpellInfo(sigil_of_flame_debuff duration=8)
	SpellInfo(sigil_of_flame_debuff duration=10 talent=concentrated_sigils_talent)
Define(sigil_of_silence 202137)
	SpellInfo(sigil_of_silence cd=60)
	SpellInfo(sigil_of_silence cd=48 talent=quickened_sigils_talent)
Define(sigil_of_silence_debuff 204490)
	SpellInfo(sigil_of_silence_debuff duration=6)
	SpellInfo(sigil_of_silence_debuff duration=8 talent=concentrated_sigils_talent)
Define(sigil_of_misery 207684)
	SpellInfo(sigil_of_misery cd=60)
	SpellInfo(sigil_of_misery cd=48 talent=quickened_sigils_talent)
Define(sigil_of_misery_debuff 207685)
	SpellInfo(sigil_of_misery_debuff duration=30)
	SpellInfo(sigil_of_misery_debuff duration=32 talent=concentrated_sigils_talent)
Define(soul_barrier 227225)
	SpellInfo(soul_barrier cd=20 pain=10 duration=30)
	SpellAddBuff(soul_barrier soul_fragments=0)
Define(soul_barrier_talent 21)
Define(soul_cleave 228477)
	SpellInfo(soul_cleave pain=25 extra_pain=25)
	SpellAddBuff(soul_cleave soul_fragments=0)
Define(soul_carver 207407)
	SpellInfo(soul_carver cd=40 tag=main)
Define(soul_fragments 203981)
	SpellInfo(soul_fragments duration=20)		
Define(spirit_bomb 247454)
	SpellRequire(spirit_bomb unusable 1=buff,!soul_fragments)
	SpellAddBuff(spirit_bomb soul_fragments=0)
	SpellAddTargetDebuff(spirit_bomb frailty_debuff=1)
Define(throw_glaive_veng 204157)
	SpellInfo(throw_glaive_veng cd=3 cd_haste=melee)
Define(throw_glaive_havoc 185123)
	SpellInfo(throw_glaive_havoc charges=1 cd=10 cd_haste=melee)
	SpellInfo(throw_glaive_havoc charges=2 talent=master_of_the_glaive_talent)
Define(unleashed_power_talent 17)
Define(vengeful_retreat 198793)
	SpellInfo(vengeful_retreat tag=main)
	SpellAddTargetDebuff(vengeful_retreat vengeful_retreat_debuff=1)
Define(vengeful_retreat_debuff 198813)
	SpellInfo(vengeful_retreat_debuff duration=3)
Define(wide_eyes_trait 238045)

`;
    OvaleScripts.RegisterScript("DEMONHUNTER", undefined, name, desc, code, "include");
}
