class User {
    publicId: string;
    title: string;
    email: string;
    role: UserRole;
    password: string;
    createdAt: Date;
    updatedAt: Date | null;
    deletedAt: Date | null;
    avatar: UserAvatar;
    bio: string;

    constructor(
        id: string,
        name: string,
        email: string,
        role: string,
        password: string,
        createdAt: Date,
        updatedAt: Date | null,
        deletedAt: Date | null,
        avatar: number,
        bio: string
    ) {
        this.publicId = id;
        this.title = name;
        this.email = email;
        this.role = decodeUserRole(role);
        this.password = password;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
        this.avatar = avatar;
        this.bio = bio;
    }

    static empty() {
        return new User(
            "",
            "",
            "",
            UserRole.Guest,
            "",
            new Date(),
            new Date(),
            null,
            UserAvatar.default,
            ""
        );
    }

    static testData() {
        return new User(
            "IwNgGltQrJpc",
            "test",
            "testing@hoarfroster.space",
            UserRole.Admin,
            "",
            new Date(),
            null,
            null,
            UserAvatar.default,
            "I just lovin' it!"
        );
    }
}

enum UserStatus {
    Busy = 0b0000,
    Offline = 0b0001,
    Happy = 0b0010,
    WeGotThis = 0b0011,
    Exhausted = 0b0100,
    LowMood = 0b0101,
    Thinking = 0b0110,
    Energetic = 0b0111,
    ZoningOut = 0b1000,
    LuckComeToMe = 0b1001,
    Sleeping = 0b1010,
    Hardworking = 0b1011,
    Studying = 0b1100,
    RushingHome = 0b1101,
    Mysterious = 0b1110,
    InLove = 0b1111
}

const userStatuses = [
    { name: "忙碌", statusCode: UserStatus.Busy },
    { name: "离线", statusCode: UserStatus.Offline },
    { name: "开心", statusCode: UserStatus.Happy },
    { name: "我们能行", statusCode: UserStatus.WeGotThis },
    { name: "疲惫", statusCode: UserStatus.Exhausted },
    { name: "低落", statusCode: UserStatus.LowMood },
    { name: "思考中", statusCode: UserStatus.Thinking },
    { name: "精力充沛", statusCode: UserStatus.Energetic },
    { name: "恍神", statusCode: UserStatus.ZoningOut },
    { name: "求运气", statusCode: UserStatus.LuckComeToMe },
    { name: "睡觉", statusCode: UserStatus.Sleeping },
    { name: "努力", statusCode: UserStatus.Hardworking },
    { name: "学习中", statusCode: UserStatus.Studying },
    { name: "赶回家", statusCode: UserStatus.RushingHome },
    { name: "神秘", statusCode: UserStatus.Mysterious },
    { name: "恋爱中", statusCode: UserStatus.InLove }
];

enum UserRole {
    Guest = "00",
    User = "01",
    Admin = "10",
    SuperAdmin = "11",
    NotSignedIn = "000"
}

const userRoles = [
    { name: "游客", role: UserRole.Guest },
    { name: "用户", role: UserRole.User },
    { name: "管理员", role: UserRole.Admin },
    { name: "超级管理员", role: UserRole.SuperAdmin }
];

export function decodeUserRole(role: string): UserRole {
    switch (role) {
        case UserRole.Guest:
            return UserRole.Guest;
        case UserRole.User:
            return UserRole.User;
        case UserRole.Admin:
            return UserRole.Admin;
        case UserRole.SuperAdmin:
            return UserRole.SuperAdmin;
        default:
            return UserRole.Guest;
    }
}

enum UserAvatar {
    default = 0b00,
    christmas = 0b01
}

const userAvatars = [
    {
        name: "默认头像",
        avatar: UserAvatar.default,
        link: "/images/default-avatar.png"
    },
    {
        name: "圣诞装扮",
        avatar: UserAvatar.christmas,
        link: "/images/christmas-avatar.png"
    }
];

export {
    User,
    UserAvatar,
    UserRole,
    UserStatus,
    userAvatars,
    userRoles,
    userStatuses
};
