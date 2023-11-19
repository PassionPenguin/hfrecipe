interface MSGraphBaseItem {
    id: string;
    name: string;
    webUrl: string;
    createdDateTime: string;
    lastModifiedDateTime: string;
    createdBy: MSGraphIdentitySet;
    lastModifiedBy: MSGraphIdentitySet;
    parentReference: MSGraphItemReference;
    fileSystemInfo: MSGraphFileSystemInfo;
    size: number;
}

interface MSGraphIdentitySet {
    application?: MSGraphIdentity | null;
    applicationInstance?: MSGraphIdentity | null;
    conversation?: MSGraphIdentity | null;
    conversationIdentityType?: MSGraphIdentity | null;
    device?: MSGraphIdentity | null;
    encrypted?: MSGraphIdentity | null;
    onPremises?: MSGraphIdentity | null;
    guest?: MSGraphIdentity | null;
    phone?: MSGraphIdentity | null;
    user?: MSGraphIdentity | null;
}

interface MSGraphIdentity {
    displayName: string;
    id: string;
}

enum MSGraphDriveType {
    personal = "personal",
    business = "business",
    documentLibrary = "documentLibrary"
}

interface MSGraphItemReference {
    driveId: string;
    driveType: MSGraphDriveType;
    id: string;
    name: string;
    path: string;
    sharedId: string;
    sharepointIds: MSGraphSharepointIds;
    siteId: string;
}

interface MSGraphSharepointIds {
    listId: string;
    listItemId: string;
    listItemUniqueId: string;
    siteId: string;
    siteUrl: string;
    webId: string;
}

interface MSGraphFileSystemInfo {
    createdDateTime: string;
    lastModifiedDateTime: string;
}

interface MSGraphDriveItem {
    audio: MSGraphAudio;
    bundle: MSGraphBundle;
    content: any;
    cTag: string;
    deleted: MSGraphDeleted;
    description: string;
    file: MSGraphFile;
    fileSystemInfo: MSGraphFileSystemInfo;
    folder: MSGraphFolder;
    image: MSGraphImage;
    location: MSGraphGeoCoordinates;
    malware: MSGraphMalware;
    package: MSGraphPackage;
    pendingOperations: MSGraphPendingOperations;
    photo: MSGraphPhoto;
    publication: MSGraphPublicationFacet;
    remoteItem: MSGraphRemoteItem;
    root: MSGraphRoot;
    searchResult: MSGraphSearchResult;
    shared: MSGraphShared;
    sharepointIds: MSGraphSharepointIds;
    size: number;
    specialFolder: MSGraphSpecialFolder;
    video: MSGraphVideo;
    webDavUrl: string;
    activities: MSGraphItemActivity[];
    analytics: MSGraphItemAnalytics;
    children: MSGraphDriveItem[];
    createdByUser: MSGraphUser;
    itemRetentionLabel: MSGraphItemRetentionLabel;
    lastModifiedByUser: MSGraphUser;
    permissions: MSGraphPermission[];
    subscriptions: MSGraphSubscription[];
    thumbnails: MSGraphThumbnailSet[];
    versions: MSGraphDriveItemVersion[];
    "@microsoft.graph.conflictBehavior": string;
    "@microsoft.graph.downloadUrl": string;
    "@microsoft.graph.sourceUrl": string;
}

interface MSGraphAudio {
    album: string;
    albumArtist: string;
    artist: string;
    bitrate: number;
    composers: string;
    copyright: string;
    disc: number;
    discCount: number;
    duration: number;
    genre: string;
    hasDrm: boolean;
    isVariableBitrate: boolean;
    title: string;
    track: number;
    trackCount: number;
    year: number;
}

interface MSGraphBundle {
    album: MSGraphAlbum;
    childCount: number;
}

interface MSGraphAlbum {
    coverImageItemId: string;
}

interface MSGraphDeleted {
    state: string;
}

interface MSGraphFile {
    hashes: MSGraphHashes;
    mimeType: string;
}

interface MSGraphHashes {
    crc32Hash?: string;
    sha1Hash?: string;
    sha256Hash?: string;
    quickXorHash?: string;
}

interface MSGraphFolder {
    childCount: number;
    view: MSGraphFolderView;
}

enum MSGraphSortBy {
    default = "default",
    name = "name",
    type = "type",
    size = "size",
    takenOrCreatedDateTime = "takenOrCreatedDateTime",
    lastModifiedDateTime = "lastModifiedDateTime",
    sequence = "sequence"
}

enum MSGraphSortOrder {
    ascending = "ascending",
    descending = "descending"
}

enum MSGraphViewType {
    none = "none",
    thumbnails = "thumbnails",
    videos = "videos",
    documents = "documents",
    photos = "photos"
}

interface MSGraphFolderView {
    sortBy: MSGraphSortBy;
    sortOrder: MSGraphSortOrder;
    viewType: MSGraphViewType;
}

interface MSGraphImage {
    width: number;
    height: number;
}

interface MSGraphGeoCoordinates {
    altitude: number;
    latitude: number;
    longitude: number;
}

interface MSGraphMalware {
    description: string;
}

interface MSGraphPackage {}

interface MSGraphPendingOperations {}

interface MSGraphPhoto {}

interface MSGraphPublicationFacet {}

interface MSGraphRemoteItem {}

interface MSGraphRoot {}

interface MSGraphSearchResult {}

interface MSGraphShared {}

interface MSGraphSpecialFolder {}

interface MSGraphVideo {}

interface MSGraphItemActivity {}

interface MSGraphItemAnalytics {}

interface MSGraphUser {
    id: string;
}

interface MSGraphItemRetentionLabel {}

interface MSGraphPermission {}

interface MSGraphSubscription {}

interface MSGraphThumbnailSet {
    id: string;
    large: MSGraphThumbnail;
    medium: MSGraphThumbnail;
    small: MSGraphThumbnail;
    source: MSGraphThumbnail;
}

interface MSGraphThumbnail {
    content: any;
    height: number;
    sourceItemId: string;
    url: string;
    width: number;
}

interface MSGraphDriveItemVersion {}

export type {
    MSGraphAlbum,
    MSGraphAudio,
    MSGraphBaseItem,
    MSGraphBundle,
    MSGraphDeleted,
    MSGraphDriveItem,
    MSGraphDriveItemVersion,
    MSGraphDriveType,
    MSGraphFile,
    MSGraphFileSystemInfo,
    MSGraphFolder,
    MSGraphFolderView,
    MSGraphGeoCoordinates,
    MSGraphHashes,
    MSGraphIdentity,
    MSGraphIdentitySet,
    MSGraphImage,
    MSGraphItemActivity,
    MSGraphItemAnalytics,
    MSGraphItemReference,
    MSGraphItemRetentionLabel,
    MSGraphMalware,
    MSGraphPackage,
    MSGraphPendingOperations,
    MSGraphPermission,
    MSGraphPhoto,
    MSGraphPublicationFacet,
    MSGraphRemoteItem,
    MSGraphRoot,
    MSGraphSearchResult,
    MSGraphShared,
    MSGraphSharepointIds,
    MSGraphSortBy,
    MSGraphSortOrder,
    MSGraphSpecialFolder,
    MSGraphSubscription,
    MSGraphThumbnail,
    MSGraphThumbnailSet,
    MSGraphUser,
    MSGraphVideo,
    MSGraphViewType
};
