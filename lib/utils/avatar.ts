// 후보 리스트 카드용
export const getThumbnailUrl = (name: string) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}`;

// 모달용
export const getProfileImageUrl = (name: string) =>
  `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(name)}&size=200`;
