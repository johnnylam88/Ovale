import __addon from "addon";
let [OVALE, Ovale] = __addon;
let OvaleHonorAmongThieves = Ovale.NewModule("OvaleHonorAmongThieves", "AceEvent-3.0");
Ovale.OvaleHonorAmongThieves = OvaleHonorAmongThieves;
let OvaleAura = undefined;
let OvaleData = undefined;
let API_GetTime = GetTime;
let INFINITY = math.huge;
let self_playerGUID = undefined;
let HONOR_AMONG_THIEVES = 51699;
let MEAN_TIME_TO_HAT = 2.2;
OvaleHonorAmongThieves.spellName = "Honor Among Thieves Cooldown";
OvaleHonorAmongThieves.spellId = HONOR_AMONG_THIEVES;
OvaleHonorAmongThieves.start = 0;
OvaleHonorAmongThieves.ending = 0;
OvaleHonorAmongThieves.duration = MEAN_TIME_TO_HAT;
OvaleHonorAmongThieves.stacks = 0;
class OvaleHonorAmongThieves {
    OnInitialize() {
        OvaleAura = Ovale.OvaleAura;
        OvaleData = Ovale.OvaleData;
    }
    OnEnable() {
        if (Ovale.playerClass == "ROGUE") {
            self_playerGUID = Ovale.playerGUID;
            this.RegisterMessage("Ovale_SpecializationChanged");
        }
    }
    OnDisable() {
        if (Ovale.playerClass == "ROGUE") {
            this.UnregisterMessage("Ovale_SpecializationChanged");
        }
    }
    Ovale_SpecializationChanged(event, specialization, previousSpecialization) {
        if (specialization == "subtlety") {
            this.RegisterEvent("COMBAT_LOG_EVENT_UNFILTERED");
        } else {
            this.UnregisterEvent("COMBAT_LOG_EVENT_UNFILTERED");
        }
    }
    COMBAT_LOG_EVENT_UNFILTERED(event, timestamp, cleuEvent, hideCaster, sourceGUID, sourceName, sourceFlags, sourceRaidFlags, destGUID, destName, destFlags, destRaidFlags, ...__args) {
        let [arg12, arg13, arg14, arg15, arg16, arg17, arg18, arg19, arg20, arg21, arg22, arg23, arg24, arg25] = __args;
        if (sourceGUID == self_playerGUID && destGUID == self_playerGUID && cleuEvent == "SPELL_ENERGIZE") {
            let [spellId, powerType] = [arg12, arg16];
            if (spellId == HONOR_AMONG_THIEVES && powerType == 4) {
                let now = API_GetTime();
                this.start = now;
                let duration = OvaleData.GetSpellInfoProperty(HONOR_AMONG_THIEVES, now, "duration", destGUID) || MEAN_TIME_TO_HAT;
                this.duration = duration;
                this.ending = this.start + duration;
                this.stacks = 1;
                OvaleAura.GainedAuraOnGUID(self_playerGUID, this.start, this.spellId, self_playerGUID, "HELPFUL", undefined, undefined, this.stacks, undefined, this.duration, this.ending, undefined, this.spellName, undefined, undefined, undefined);
            }
        }
    }
}
