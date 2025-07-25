import { Branch, Category, GRNHeader, GRNLineItems, SubCategory, Vendor } from "@/models";

GRNHeader.hasMany(GRNLineItems, {
    foreignKey : 'grn_header_id',
    as: 'line_items',
    onDelete: 'CASCADE',
})

GRNLineItems.belongsTo(GRNHeader, {
    foreignKey: 'grn_header_id',
    as: 'grn_header',
});

GRNLineItems.belongsTo(SubCategory, {
    foreignKey: 'sub_category_id',
    as: 'sub_category',
});

GRNHeader.belongsTo(Vendor,{
    foreignKey: 'vendor_id',
    as: 'vendor',
})

Vendor.hasMany(GRNHeader, {
    foreignKey: 'vendor_id',   
    as:'grns'
})

GRNHeader.belongsTo(Branch, {
    foreignKey: 'branch_id',
    as: 'branch',
});

Branch.hasMany(GRNHeader, {
    foreignKey: 'branch_id',
    as: 'grns'
});

// Category.hasMany(SubCategory,{
//     foreignKey:'sub_category_id',
//     as :'sub_categories'
// })

// SubCategory.belongsTo(Category , {
//     foreignKey : 'sub_category_id',
//     as:'category'
// })
