var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import bcrypt from "bcrypt";
import Institution from "../models/institution";
/* Register */
export const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hashedPassword = yield bcrypt.hash(req.body.password, 10);
        const newInstitution = new Institution({
            institutionName: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            address: req.body.address,
            phoneNumber: req.body.phone,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            institutionOwnership: req.body.institutionOwnership,
            tscCode: req.body.tscCode,
            knecCode: req.body.knecCode,
            kraPin: req.body.kraPin,
            bannerPath: req.body.bannerPath,
            logoPath: req.body.logoPath,
            website: req.body.website,
            classes: req.body.classes,
            teachers: req.body.teachers,
            staff: req.body.staff,
        });
        yield newInstitution.save();
        res.status(201).json(newInstitution);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});
