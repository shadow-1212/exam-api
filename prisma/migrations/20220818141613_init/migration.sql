-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_lastname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_activated" BOOLEAN NOT NULL,
    "user_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_updated_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Device" (
    "dvc_id" SERIAL NOT NULL,
    "dvc_name" TEXT NOT NULL,
    "dvc_description" TEXT NOT NULL,
    "dvc_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dvc_updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "stateId" INTEGER NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("dvc_id")
);

-- CreateTable
CREATE TABLE "State" (
    "state_id" SERIAL NOT NULL,
    "state_name" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("state_id")
);

-- CreateTable
CREATE TABLE "DeviceActions" (
    "dact_id" SERIAL NOT NULL,
    "dact_name" TEXT NOT NULL,
    "dact_description" TEXT NOT NULL,
    "dact_date" TIMESTAMP(3) NOT NULL,
    "dact_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deviceId" INTEGER NOT NULL,

    CONSTRAINT "DeviceActions_pkey" PRIMARY KEY ("dact_id")
);

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "State"("state_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DeviceActions" ADD CONSTRAINT "DeviceActions_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("dvc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
