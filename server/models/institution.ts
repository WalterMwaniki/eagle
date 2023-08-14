import mongoose, { Schema, Document } from "mongoose";
import validator from "validator";

interface IInstitution extends Document {
  institutionName: string;
  IUC: string;
  email: string;
  password: string;
  phoneNumber: string;
  registrationDate: Date;
  educationSystem: string;
  educationLevel: string;
  institutionCluster: string;
  institutionGenderType: string;
  institutionAccomodationType: string;
  county: string;
  subCounty: string;
  zone: string;
  ward: string;
  constituency: string;
  longitude: number;
  latitude: number;
  institutionOwnership: string;
  tscCode: string;
  knecCode: string;
  kraPin: string;
  bannerPath?: string;
  logoPath?: string;
  website?: string;
  classes: string[];
  teachers: string[];
  staff: string[];
}

const InstitutionSchema: Schema = new Schema(
  {
    institutionName: {
      type: String,
      required: [true, "Please enter the name of your Institution"],
      min: 10,
      max: 50,
      uppercase: true,
    },
    IUC: {
      type: String,
      required: [true, "Institution IUC is required"],
      unique: true,
      min: 4,
      max: 6,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Please enter a valid email address"],
      unique: true,
      min: 5,
      max: 50,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter a valid password"],
      min: [8, "Password must be at least 8 characters long"],
      max: 1024,
    },
    phoneNumber: {
      type: String,
      required: [true, "Please enter a valid phone number"],
      unique: true,
      min: 10,
      max: 15,
    },
    registrationDate: {
      type: Date,
      default: Date.now,
    },
    educationSystem: {
      type: String,
      required: [true, "Please enter the education system(s) offered"],
      min: 4,
      max: 15,
    },
    educationLevel: {
      type: String,
      required: [true, "Please enter the education level(s) offered"],
      min: 4,
      max: 15,
    },
    institutionCluster: {
      type: String,
      required: true,
      min: 5,
      max: 25,
    },
    institutionGenderType: {
      type: String,
      required: true,
      min: 4,
      max: 6,
    },
    institutionAccomodationType: {
      type: String,
      required: true,
      min: 4,
      max: 15,
    },
    county: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    subCounty: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    zone: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    ward: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    constituency: {
      type: String,
      required: true,
      min: 5,
      max: 20,
    },
    longitude: {
      type: Number,
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    institutionOwnership: {
      type: String,
      required: true,
      min: 5,
      max: 25,
    },
    tscCode: {
      type: String,
      unique: true,
      min: 4,
      max: 6,
    },
    knecCode: {
      type: String,
      unique: true,
      min: 4,
      max: 6,
    },
    kraPin: {
      type: String,
      unique: true,
      min: 4,
      max: 6,
    },
    bannerPath: {
      type: String,
    },
    logoPath: {
      type: String,
    },
    website: {
      type: String,
      min: 5,
      max: 50,
      validate: [validator.isURL, "Please enter a valid website URL"],
    },
    classes: {
      type: [String],
      default: [],
    },
    teachers: {
      type: [String],
      default: [],
    },
    staff: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

const Institution = mongoose.model<IInstitution>("Institution", InstitutionSchema);

export default Institution;
