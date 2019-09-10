const slotIds = [
  'div-gpt-ad-leaderboard-multi',
  'div-gpt-ad-sidebar-ATF',
  'div-gpt-ad-300x250-ATF-1',
  'div-gpt-ad-300x250-BTF-1',
  'div-gpt-ad-leaderboard-single',
  'GardeningKnowHow_300x600_300x250_160x600_Homepage_Right',
  'GardeningKnowHow_300x600_300x250_160x600_category',
  'GardeningKnowHow_728x90_970x90_320x50_BTF_HP',
  'GardeningKnowHow_728x90_970x90_320x50_ATF_HP',
  'GardeningKnowHow_728x90_Incontent_HP',
  'gardeningknowhow_300x250_300x600_160x60_blog',
  'GardeningKnowHow_300x250_320x50_Mobile_InContent',
  'div-gpt-ad-footer-BTF',
  'gardeningknowhow_1x1_pushdown',
  'GardeningKnowHow_300x600_300x250_160x600_Homepage_Right_2',
  'GardeningKnowHow_1x1_video'
];

const adSlots = slotIds.map(slotId => {
  return {
    placementName: slotId,
    slotId
  };
});

const getAdSlotById = (id: string) => adSlots.filter(adSlot => adSlot.slotId === id)[0];

export {
  getAdSlotById,
  slotIds
};
