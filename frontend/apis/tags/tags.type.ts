export type Tag = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type TagsListItem = Tag & { VendorTag: VendorTag[] };

export type GetAllTagsApiResponse = {
  total: number;
  list: TagsListItem[];
};

export type VendorTag = {
  userId: string;
  tagId: string;
  createdAt: string;
  updatedAt: string;
};

export type AddVendorTagApiResponse = Tag & {
  VendorTag: VendorTag[];
};
