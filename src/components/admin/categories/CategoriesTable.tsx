import type { Category } from "./types";
import Link from "next/link";
import { 
  Search, Filter, Eye, Edit2, MoreVertical, 
  ChevronRight, ChevronLeft,
  Trash2
} from "lucide-react";

type Props = {
  categories: Category[];
  selectedCategoryId: number;
  onSelectCategory: (id: number) => void;
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
};

export default function CategoriesTable({ categories, selectedCategoryId, onSelectCategory,onEdit,onDelete }: Props) {

return(<div className="bg-white rounded-lg border flex flex-col">
          
          {/* Toolbar */}
          <div className="p-4 border-b flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 border-b bg-gray-50/50">
                <tr>
                  <th className="hidden md:table-cell px-6 py-4 w-12"><input type="checkbox" className="rounded border-gray-300" /></th>
                  <th className="px-6 py-4 font-semibold">Category Name</th>
                  <th className="px-6 py-4 font-semibold">Slug</th>
                  <th className="hidden md:table-cell px-6 py-4 font-semibold text-center">Description</th>
    
                  <th className="px-6 py-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {categories.map((category) => {
                  const isActive = category.id === selectedCategoryId;
                  return (
                    <tr 
                      key={category.id} 
                      onClick={() => onSelectCategory(category.id)}
                      className={`cursor-pointer ${isActive ? "bg-blue-50/50 border-l-2 border-l-primary" : "hover:bg-gray-50/50"}`}
                    >
                      <td className="hidden md:table-cell px-6 py-4" onClick={(e) => e.stopPropagation()}>
                        <input type="checkbox" className="rounded border-gray-300" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="hover:text-primary transition-colors">
                          <p className="font-semibold text-gray-900">{category.name}</p>
                          <p className="text-xs text-gray-500">{category.id}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
  <span className="font-medium">{category.slug}</span>
</td>

<td className="hidden md:table-cell px-6 py-4">
  <span className="text-gray-600">
    {category.description}
  </span>
</td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        <div className="flex items-center justify-end gap-3">
                          <Link
  href={`/admin/categories/${category.id}`}
  className="hidden md:block hover:text-primary transition-colors"
>
                            <Eye className="w-4 h-4" />
                          </Link>
                         <button
                        onClick={(e) => {
    e.stopPropagation();
    onEdit(category);
  }}
  className="hidden md:block hover:text-gray-600 transition-colors"
>
  <Edit2 className="w-4 h-4" />
</button>
<button
  onClick={(e) => {
    e.stopPropagation();
    onDelete(category);
  }}
  className="hover:text-red-600 transition-colors"
>
  <Trash2 className="w-4 h-4" />
</button>
                          <button className="hover:text-gray-600 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="p-4 border-t flex flex-col sm:flex-row gap-4 sm:justify-between sm:items-center text-sm text-gray-500 bg-gray-50/30">
            <p>Showing <span className="font-medium text-gray-900">1-{categories.length}</span> of <span className="font-medium text-gray-900">{categories.length}</span> categories</p>
            <div className="flex gap-1">
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"><ChevronLeft className="w-4 h-4" /></button>
              <button className="w-8 h-8 flex items-center justify-center border rounded bg-blue-50 text-primary border-blue-200 font-medium">1</button>
              <button className="w-8 h-8 flex items-center justify-center border rounded hover:bg-gray-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
        );
    }