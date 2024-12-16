const menuItemDAO = require("../daos/MenuItemDAO");

exports.getAllMenuItems = async ({ category, name, limit = 10, page = 1 }) => {
    const query = {};
    if (category) {
        query.category = category;
    }
    if (name) {
        query.name = { $regex: name, $options: "i" }; // Case-insensitive search
    }

    const itemsPerPage = parseInt(limit);
    const skip = (parseInt(page) - 1) * itemsPerPage;

    const [menuItems, totalItems] = await Promise.all([
        menuItemDAO.getMenuItems(query, skip, itemsPerPage),
        menuItemDAO.countMenuItems(query),
    ]);

    return {
        menuItems,
        totalItems,
        totalPages: Math.ceil(totalItems / itemsPerPage),
        currentPage: parseInt(page),
    };
};

exports.getMenuItemById = async (id) => {
    return await menuItemDAO.getMenuItemById(id);
};

exports.createMenuItem = async (menuItemData) => {
    return await menuItemDAO.createMenuItem(menuItemData);
};

exports.updateMenuItem = async (id, updateData) => {
    return await menuItemDAO.updateMenuItem(id, updateData);
};

exports.deleteMenuItem = async (id) => {
    const result = await menuItemDAO.deleteMenuItem(id);
    if (!result) {
        throw new Error("Menu item not found");
    }
    return "Menu item deleted successfully";
};
