/*
  Warnings:

  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `username` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `createdAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `updatedAt` on the `User` table. The data in that column could be lost. The data in that column will be cast from `DateTime(3)` to `DateTime(0)`.
  - You are about to alter the column `role` on the `User` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(12))`.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `fullName` VARCHAR(64) NULL,
    ADD COLUMN `phone` VARCHAR(45) NULL,
    MODIFY `email` VARCHAR(45) NOT NULL,
    MODIFY `username` VARCHAR(45) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `updatedAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    MODIFY `role` ENUM('admin', 'user', 'guide', 'temple') NOT NULL DEFAULT 'user';

-- CreateTable
CREATE TABLE `Activity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `description` VARCHAR(45) NULL,
    `startDate` DATETIME(0) NOT NULL,
    `endDate` DATETIME(0) NOT NULL,
    `imagePath` VARCHAR(255) NULL,
    `templeId` INTEGER NOT NULL,

    INDEX `fk_templeActivity_temple1_idx`(`templeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Charm` (
    `charmId` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NULL,
    `imagePath` VARCHAR(255) NULL,
    `price` FLOAT NULL,
    `avalibleDate` DATETIME(0) NULL,
    `status` TINYINT NOT NULL DEFAULT 1,
    `detail` VARCHAR(45) NULL,
    `templeId` INTEGER NOT NULL,

    INDEX `fk_templeCharm_temple1_idx`(`templeId`),
    PRIMARY KEY (`charmId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `IdentityDocument` (
    `id` INTEGER NOT NULL,
    `type` ENUM('Id verification', 'Guide Certification', 'Temple Document') NOT NULL,
    `filePath` VARCHAR(255) NULL,
    `uploadedDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `requestId` INTEGER NOT NULL,

    INDEX `fk_identityDocument_request1_idx`(`requestId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(45) NOT NULL,
    `latitude` DOUBLE NULL,
    `longitude` DOUBLE NULL,
    `type` ENUM('temple', 'place') NOT NULL DEFAULT 'place',
    `provinceId` INTEGER NULL,

    INDEX `fk_Location_Province1_idx`(`provinceId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `status` ENUM('pending', 'successful', 'failed', 'refund') NOT NULL DEFAULT 'pending',
    `amount` FLOAT NULL,
    `method` ENUM('qrcode', 'wallet') NOT NULL DEFAULT 'wallet',
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `transactionId` INTEGER NOT NULL,

    INDEX `fk_Payment_Transaction1_idx`(`transactionId`),
    INDEX `fk_Payment_TripOrder1_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Province` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Refund` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `reason` VARCHAR(255) NOT NULL,
    `identityImagePath` VARCHAR(255) NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `orderId` INTEGER NOT NULL,
    `status` ENUM('pending', 'reject', 'appoved') NOT NULL DEFAULT 'pending',
    `reasonOwner` VARCHAR(255) NULL,

    INDEX `fk_Refund_TripOrder1_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Request` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Become Guide', 'Register as Temple') NOT NULL,
    `status` ENUM('Pending', 'Approved', 'Rejected') NOT NULL DEFAULT 'Pending',
    `createdDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,

    INDEX `fk_request_user1_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewGuide` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `rating` FLOAT NULL,
    `comment` TEXT NULL,
    `reviewDate` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `userId` INTEGER NOT NULL,
    `guideId` INTEGER NOT NULL,

    INDEX `fk_reviewGuide_user1_idx`(`userId`),
    INDEX `fk_reviewGuide_user2_idx`(`guideId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Temple` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `description` VARCHAR(45) NULL,
    `likes` INTEGER NULL,
    `locationId` INTEGER NOT NULL,

    INDEX `fk_Temple_Location1_idx`(`locationId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TempleImage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(255) NULL,
    `description` VARCHAR(45) NULL,
    `templeId` INTEGER NOT NULL,

    INDEX `fk_templeAlbum_temple1_idx`(`templeId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `walletId` INTEGER NOT NULL,
    `amount` FLOAT NOT NULL,
    `type` ENUM('topup', 'payment', 'refund', 'withdraw') NOT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_transaction_wallet1_idx`(`walletId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Trip` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(64) NOT NULL,
    `description` TEXT NULL,
    `dateStart` DATETIME(0) NOT NULL,
    `dateEnd` DATETIME(0) NOT NULL,
    `vehicle` ENUM('van', 'bus') NOT NULL DEFAULT 'van',
    `maxPerson` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('waiting', 'incoming', 'ongoing', 'complete', 'cancel') NOT NULL DEFAULT 'waiting',
    `ownerTripId` INTEGER NOT NULL,
    `type` ENUM('paid', 'free') NOT NULL DEFAULT 'free',
    `price` FLOAT NOT NULL DEFAULT 0,

    INDEX `fk_Trip_User1_idx`(`ownerTripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tripId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `arriveTime` TIME(0) NOT NULL,
    `day` INTEGER NOT NULL,
    `description` TEXT NULL,
    `locationId` INTEGER NOT NULL,

    INDEX `fk_TripDetail_Location1_idx`(`locationId`),
    INDEX `fk_tripDetail_trip2_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripDetailPicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(255) NULL,
    `tripDetailId` INTEGER NOT NULL,

    INDEX `fk_tripDetailPicture_tripDetail1_idx`(`tripDetailId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripOrder` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `tripId` INTEGER NOT NULL,
    `amountPerson` INTEGER NOT NULL DEFAULT 1,
    `status` ENUM('pending', 'paid', 'cancel', 'claims') NOT NULL DEFAULT 'pending',
    `totalPrice` FLOAT NULL,
    `createdAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `fk_userInTrip_trip1_idx`(`tripId`),
    INDEX `fk_userInTrip_user1_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripOrderDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `orderId` INTEGER NOT NULL,
    `order` INTEGER NOT NULL,
    `fullName` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(45) NULL,
    `requirement` VARCHAR(255) NULL,
    `isChild` TINYINT NOT NULL DEFAULT 0,
    `identityCode` VARCHAR(4) NOT NULL,
    `isJoined` TINYINT NOT NULL DEFAULT 0,

    INDEX `fk_UserInTripDetail_UserInTrip1_idx`(`orderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TripPicture` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `imagePath` VARCHAR(255) NULL,
    `tripId` INTEGER NOT NULL,

    INDEX `fk_tripPicture_trip1_idx`(`tripId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `balance` FLOAT NOT NULL,
    `userId` INTEGER NOT NULL,

    INDEX `fk_wallet_user1_idx`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Activity` ADD CONSTRAINT `fk_templeActivity_temple1` FOREIGN KEY (`templeId`) REFERENCES `Temple`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Charm` ADD CONSTRAINT `fk_templeCharm_temple1` FOREIGN KEY (`templeId`) REFERENCES `Temple`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `IdentityDocument` ADD CONSTRAINT `fk_identityDocument_request1` FOREIGN KEY (`requestId`) REFERENCES `Request`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Location` ADD CONSTRAINT `fk_Location_Province1` FOREIGN KEY (`provinceId`) REFERENCES `Province`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `fk_Payment_Transaction1` FOREIGN KEY (`transactionId`) REFERENCES `Transaction`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `fk_Payment_TripOrder1` FOREIGN KEY (`orderId`) REFERENCES `TripOrder`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Refund` ADD CONSTRAINT `fk_Refund_TripOrder1` FOREIGN KEY (`orderId`) REFERENCES `TripOrder`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Request` ADD CONSTRAINT `fk_request_user1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ReviewGuide` ADD CONSTRAINT `fk_reviewGuide_user1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `ReviewGuide` ADD CONSTRAINT `fk_reviewGuide_user2` FOREIGN KEY (`guideId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Temple` ADD CONSTRAINT `fk_Temple_Location1` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TempleImage` ADD CONSTRAINT `fk_templeAlbum_temple1` FOREIGN KEY (`templeId`) REFERENCES `Temple`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Transaction` ADD CONSTRAINT `fk_transaction_wallet1` FOREIGN KEY (`walletId`) REFERENCES `Wallet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Trip` ADD CONSTRAINT `fk_Trip_User1` FOREIGN KEY (`ownerTripId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripDetail` ADD CONSTRAINT `fk_TripDetail_Location1` FOREIGN KEY (`locationId`) REFERENCES `Location`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripDetail` ADD CONSTRAINT `fk_tripDetail_trip2` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripDetailPicture` ADD CONSTRAINT `fk_tripDetailPicture_tripDetail1` FOREIGN KEY (`tripDetailId`) REFERENCES `TripDetail`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripOrder` ADD CONSTRAINT `fk_userInTrip_trip1` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripOrder` ADD CONSTRAINT `fk_userInTrip_user1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripOrderDetail` ADD CONSTRAINT `fk_UserInTripDetail_UserInTrip1` FOREIGN KEY (`orderId`) REFERENCES `TripOrder`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `TripPicture` ADD CONSTRAINT `fk_tripPicture_trip1` FOREIGN KEY (`tripId`) REFERENCES `Trip`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Wallet` ADD CONSTRAINT `fk_wallet_user1` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User_email_key` TO `email_UNIQUE`;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `User_username_key` TO `username_UNIQUE`;
