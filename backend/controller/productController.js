import Product from "../model/product.js";

import fs from "fs";
import slugify from "slugify";
export const create = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name.trim():
        res.json({ error: "Name is required" });
      case !description:
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.sizr > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }
    //create product

    const product = new Product({ ...req.fields, slug: slugify(name) });
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });
    res.json(all);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .select("-photo");
    res.json(product);
  } catch (error) {
    res.status(401).json(error.message);
  }
};

export const photo = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).select(
      "photo"
    );
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const remove = async (req, res) => {
  try {
    const removed = await Product.findByIdAndDelete(
      req.params.productId
    ).select("-photo");
    res.json("Đã xóa sách: " + removed);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};

export const update = async (req, res) => {
  try {
    const { name, description, price, category, quantity, shipping } =
      req.fields;
    const { photo } = req.files;

    //validation
    switch (true) {
      case !name:
        res.json({ error: "Name is required" });
      case !description:
        res.json({ error: "Description is required" });
      case !price.trim():
        res.json({ error: "Price is required" });
      case !category.trim():
        res.json({ error: "Category is required" });
      case !quantity.trim():
        res.json({ error: "Quantity is required" });
      case !shipping.trim():
        res.json({ error: "Shipping is required" });
      case photo && photo.sizr > 1000000:
        res.json({ error: "Image should be less than 1mb in size" });
    }
    //update
    const product = await Product.findByIdAndUpdate(
      req.params.productId,
      {
        ...req.fields,
        slug: slugify(name),
      },
      { new: true }
    );
    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    await product.save();
    res.json(product);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error.message);
  }
};
