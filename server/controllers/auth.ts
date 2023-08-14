import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Institution from "../models/institution";

/* Register */
export const register = async (req: express.Request, res: express.Response) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
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
    await newInstitution.save();
    res.status(201).json(newInstitution);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
};
