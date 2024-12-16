const MenuItem = require("../models/MenuItem");

exports.getMenuItems = async (query, skip, limit) => {
    return await MenuItem.find(query).skip(skip).limit(limit);
};

exports.countMenuItems = async (query) => {
    return await MenuItem.countDocuments(query);
};

exports.getMenuItemById = async (id) => {
    return await MenuItem.findById(id);
};

exports.createMenuItem = async (menuItemData) => {
    const newMenuItem = new MenuItem(menuItemData);
    return await newMenuItem.save();
};

exports.updateMenuItem = async (id, updateData) => {
    return await MenuItem.findByIdAndUpdate(id, updateData, { new: true });
};

exports.deleteMenuItem = async (id) => {
    return await MenuItem.findByIdAndDelete(id);
};
