import { Haptics, ImpactStyle } from "@capacitor/haptics";

export const useHapticsFeedback = () => {
  const triggerHaptics = async () => {
    return Haptics.impact({ style: ImpactStyle.Medium });
  }

  return {
    triggerHaptics,
  }
}