"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { Switch } from "@/components/ui/switch";
import {
  useAdminCategories,
  useCreateProduct,
  useUpdateProduct,
} from "../queries";
import { Loader2, Plus, X } from "lucide-react";
import Image from "next/image";

const productSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  shortDescription: z.string().optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  compareAtPrice: z.coerce
    .number()
    .min(0, "Compare at price must be positive")
    .optional(),
  cost: z.coerce.number().min(0, "Cost must be positive").optional(),
  sku: z.string().min(1, "SKU is required"),
  stock: z.coerce.number().min(0, "Stock must be positive"),
  lowStockThreshold: z.coerce
    .number()
    .min(0, "Threshold must be positive")
    .optional(),
  category: z.string().min(1, "Category is required"),
  brand: z.string().optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: any;
}

export function ProductModal({ isOpen, onClose, product }: ProductModalProps) {
  const isEditing = !!product;
  const { data: categoriesData, isLoading: isLoadingCategories } =
    useAdminCategories();

  console.log("categoriesData", categoriesData);
  // Flatten categories if they are hierarchical
  const categories = useMemo(() => {
    const rawData = categoriesData?.data || [];

    const flatten = (items: any[], level = 0): any[] => {
      let flat: any[] = [];
      items.forEach((item) => {
        flat.push({
          ...item,
          label:
            level > 0 ? `${"\u00A0".repeat(level * 4)}${item.name}` : item.name,
          level,
        });
        if (item.subcategories && item.subcategories.length > 0) {
          flat = [...flat, ...flatten(item.subcategories, level + 1)];
        }
      });
      return flat;
    };

    const flatList = flatten(rawData);

    // Remove duplicates if the API returned both parent-child and flat list
    const seen = new Set();
    return flatList.filter((item) => {
      const id = item.id || item._id;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  }, [categoriesData]);

  const { mutate: createProduct, isPending: isCreating } = useCreateProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      shortDescription: "",
      price: 0,
      compareAtPrice: 0,
      cost: 0,
      sku: "",
      stock: 0,
      lowStockThreshold: 5,
      category: "",
      brand: "",
      isActive: true,
      isFeatured: false,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        shortDescription: product.shortDescription || "",
        price: product.price,
        compareAtPrice: product.compareAtPrice || 0,
        cost: product.cost || 0,
        sku: product.sku,
        stock: product.stock,
        lowStockThreshold: product.lowStockThreshold || 5,
        category: product.category?._id || product.category,
        brand: product.brand || "",
        isActive: product.isActive,
        isFeatured: product.isFeatured || false,
      });
    } else {
      form.reset({
        name: "",
        description: "",
        shortDescription: "",
        price: 0,
        compareAtPrice: 0,
        cost: 0,
        sku: "",
        stock: 0,
        lowStockThreshold: 5,
        category: "",
        brand: "",
        isActive: true,
        isFeatured: false,
      });
    }
  }, [product, form]);

  const onSubmit = (values: ProductFormValues) => {
    // Construct FormData for multipart submission
    const formData = new FormData();

    // Append basic fields
    Object.entries(values).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        formData.append(key, String(value));
      }
    });

    // Append files
    selectedFiles.forEach((file) => {
      formData.append("files", file);
    });

    if (isEditing) {
      updateProduct(
        { id: product._id, data: formData },
        {
          onSuccess: () => {
            form.reset();
            onClose();
            setSelectedFiles([]);
            setPreviewUrls([]);
          },
        },
      );
    } else {
      createProduct(formData, {
        onSuccess: () => {
          form.reset();
          onClose();
          setSelectedFiles([]);
          setPreviewUrls([]);
        },
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);

      const urls = files.map((file) => URL.createObjectURL(file));
      setPreviewUrls((prev) => [...prev, ...urls]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  const isLoading = isCreating || isUpdating;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="sm:max-w-[600px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>
            {isEditing ? "Edit Product" : "Add New Product"}
          </SheetTitle>
        </SheetHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      Product Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter brand name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="sku"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>
                      SKU <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="PROD-001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>
                      Category <span className="text-red-500">*</span>
                    </FormLabel>
                    {isLoadingCategories ? (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground p-2 border rounded-md bg-muted/20">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Loading categories...
                      </div>
                    ) : categories.length === 0 ? (
                      <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
                        No categories found. You must{" "}
                        <a
                          href="/admin/categories"
                          className="underline font-semibold hover:text-amber-800"
                        >
                          create a category
                        </a>{" "}
                        first.
                      </div>
                    ) : (
                      <FormControl>
                        <select
                          {...field}
                          className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {categories.map((c: any) => (
                            <option key={c.id || c._id} value={c.id || c._id}>
                              {c.label || c.name}
                            </option>
                          ))}
                        </select>
                      </FormControl>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Short Description</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Brief summary of the product"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }: { field: any }) => (
                <FormItem>
                  <FormLabel>
                    Full Description <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter detailed product description"
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>
                      Sale Price <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="compareAtPrice"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Compare Price</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cost"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Cost</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>
                      Stock Quantity <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lowStockThreshold"
                render={({ field }: { field: any }) => (
                  <FormItem>
                    <FormLabel>Low Stock Alert</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-2">
              <FormLabel>Product Images</FormLabel>
              <div className="grid grid-cols-4 gap-4">
                {product?.images?.map((url: string, index: number) => (
                  <div
                    key={`existing-${index}`}
                    className="relative aspect-square rounded-md overflow-hidden border"
                  >
                    <Image
                      src={
                        url.startsWith("http")
                          ? url
                          : `http://localhost:8000/${url}`
                      }
                      alt={`Existing image ${index}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
                {previewUrls.map((url, index) => (
                  <div
                    key={`new-${index}`}
                    className="relative aspect-square rounded-md overflow-hidden border"
                  >
                    <Image
                      src={url}
                      alt={`New preview ${index}`}
                      fill
                      className="object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeFile(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center aspect-square rounded-md border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 cursor-pointer transition-colors">
                  <Plus className="h-6 w-6 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground mt-1">
                    Add Image
                  </span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-8 pt-2">
              <FormField
                control={form.control}
                name="isActive"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="mt-0">Active</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormLabel className="mt-0">Featured</FormLabel>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <SheetFooter
              className="pt-4"
              style={{
                position: "absolute",
                bottom: "20px",
                width: "86%",
                right: "20px",
                left: "20px",
                margin: "0 auto",
              }}
            >
              <Button
                className="flex-1"
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" className="flex-1" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditing ? "Save Changes" : "Create Product"}
              </Button>
            </SheetFooter>
          </form>
        </Form>
      </SheetContent>
    </Sheet>
  );
}
