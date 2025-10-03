import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  instructions: string[];
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: string;
  cuisine: string;
  caloriesPerServing: number;
  tags: string[];
  userId: number;
  image: string;
  rating: number;
  reviewCount: number;
  mealType: string[];
}

interface RecipesResponse {
  recipes: Recipe[];
  total: number;
  skip: number;
  limit: number;
}

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [total, setTotal] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentPage = parseInt(searchParams.get('page') || '1');
  const limit = 6; // 6 recipes per page (2 rows x 3 columns)

  useEffect(() => {
    const skip = (currentPage - 1) * limit;
    fetch(`https://dummyjson.com/recipes?limit=${limit}&skip=${skip}`)
      .then(res => res.json())
      .then((data: RecipesResponse) => {
        setRecipes(data.recipes);
        setTotal(data.total);
      });
  }, [currentPage]);

  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page: number) => {
    setSearchParams({ page: page.toString() });
  };

  const handleRecipeClick = (id: number) => {
    navigate(`/recipe/${id}`);
  };

  return (
    <div className="bg-[#f6f6f6] relative min-h-screen w-full pb-20">
      {/* Header */}
      <div className="bg-[#f6f6f6] h-[80px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] w-full flex items-center justify-center sticky top-0 z-10">
        <h1 className="font-bold text-[28px] text-black tracking-tight">
          천개의 레시피
        </h1>
      </div>

      {/* Recipe Grid */}
      <div className="flex flex-col gap-[64px] items-center mx-auto mt-[120px] px-4 max-w-[1100px]">
        <div className="flex flex-col gap-[56px] items-start w-full">
          {/* First Row */}
          <div className="flex gap-[28px] items-start justify-center w-full">
            {recipes.slice(0, 3).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className="flex flex-col items-start overflow-hidden rounded-[16px] w-[340px] cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div
                  className="h-[200px] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="bg-white box-border flex flex-col gap-[18px] items-start p-[20px] w-full min-h-[140px]">
                  <div className="flex items-center justify-between w-full gap-3">
                    <h3 className="font-semibold text-[22px] text-black leading-tight flex-1 line-clamp-2">
                      {recipe.name}
                    </h3>
                    <span className="font-medium text-[#007aff] text-[15px] shrink-0">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex gap-[10px] items-start flex-wrap">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <div
                        key={index}
                        className="border border-[rgba(118,118,128,0.12)] border-solid box-border flex items-center justify-center px-[10px] py-[6px] rounded-[6px]"
                      >
                        <span className="font-normal text-[13px] text-[rgba(27,31,38,0.72)]">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Second Row */}
          <div className="flex gap-[28px] items-start justify-center w-full">
            {recipes.slice(3, 6).map((recipe) => (
              <div
                key={recipe.id}
                onClick={() => handleRecipeClick(recipe.id)}
                className="flex flex-col items-start overflow-hidden rounded-[16px] w-[340px] cursor-pointer hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                <div
                  className="h-[200px] w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${recipe.image})` }}
                />
                <div className="bg-white box-border flex flex-col gap-[18px] items-start p-[20px] w-full min-h-[140px]">
                  <div className="flex items-center justify-between w-full gap-3">
                    <h3 className="font-semibold text-[22px] text-black leading-tight flex-1 line-clamp-2">
                      {recipe.name}
                    </h3>
                    <span className="font-medium text-[#007aff] text-[15px] shrink-0">
                      {recipe.difficulty}
                    </span>
                  </div>
                  <div className="flex gap-[10px] items-start flex-wrap">
                    {recipe.tags.slice(0, 3).map((tag, index) => (
                      <div
                        key={index}
                        className="border border-[rgba(118,118,128,0.12)] border-solid box-border flex items-center justify-center px-[10px] py-[6px] rounded-[6px]"
                      >
                        <span className="font-normal text-[13px] text-[rgba(27,31,38,0.72)]">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex gap-[12px] items-center justify-center">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="bg-white border border-[rgba(118,118,128,0.12)] border-solid box-border flex items-center justify-center px-[16px] py-[10px] rounded-[6px] disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-[15px] text-[rgba(27,31,38,0.72)]">
              이전
            </span>
          </button>

          {Array.from({ length: Math.min(10, totalPages) }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`box-border flex items-center justify-center w-[40px] h-[40px] rounded-[6px] transition-all ${
                currentPage === page
                  ? 'bg-white border-2 border-[rgba(118,118,128,0.3)]'
                  : 'bg-white border border-[rgba(118,118,128,0.12)] hover:bg-gray-50'
              }`}
            >
              <span className={`font-semibold text-[15px] ${
                currentPage === page ? 'text-black' : 'text-[rgba(27,31,38,0.72)]'
              }`}>
                {page}
              </span>
            </button>
          ))}

          <button
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="bg-white border border-[rgba(118,118,128,0.12)] border-solid box-border flex items-center justify-center px-[16px] py-[10px] rounded-[6px] disabled:opacity-50 hover:bg-gray-50 transition-colors"
          >
            <span className="font-medium text-[15px] text-[rgba(27,31,38,0.72)]">
              다음
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
