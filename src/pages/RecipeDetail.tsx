import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

export default function RecipeDetail() {
  const { id } = useParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);

  useEffect(() => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data: Recipe) => {
        setRecipe(data);
      });
  }, [id]);

  if (!recipe) {
    return (
      <div className="bg-[#f6f6f6] min-h-screen w-full flex items-center justify-center">
        <div className="text-[20px] font-medium text-black">Loading...</div>
      </div>
    );
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  return (
    <div className="bg-[#f6f6f6] relative min-h-screen w-full pb-20">
      {/* Header */}
      <div className="bg-[#f6f6f6] h-[80px] shadow-[0px_1px_4px_0px_rgba(12,12,13,0.1),0px_1px_4px_0px_rgba(12,12,13,0.05)] w-full flex items-center justify-center sticky top-0 z-10">
        <h1 className="font-bold text-[28px] text-black tracking-tight">
          천개의 레시피
        </h1>
      </div>

      {/* Content */}
      <div className="box-border flex flex-col gap-[60px] items-start mx-auto mt-[120px] px-8 max-w-[1100px]">
        {/* Recipe Header */}
        <div className="flex gap-[40px] items-start w-full">
          <div
            className="bg-cover bg-center rounded-[12px] shrink-0 w-[280px] h-[280px] shadow-md"
            style={{ backgroundImage: `url(${recipe.image})` }}
          />
          <div className="flex flex-col items-start justify-between py-2 flex-1">
            <div className="flex flex-col gap-[28px] items-start w-full">
              <div className="flex gap-[20px] items-center">
                <h2 className="font-bold text-[32px] text-black leading-tight">
                  {recipe.name}
                </h2>
                <span className="font-medium text-[#007aff] text-[16px] px-3 py-1 bg-blue-50 rounded-lg">
                  {recipe.difficulty}
                </span>
              </div>
              <div className="flex flex-col gap-[20px] items-start">
                <p className="font-semibold text-[18px] text-black">
                  총 요리시간 {totalTime}분
                </p>
                <div className="flex gap-[32px] font-normal text-[16px] text-black">
                  <p>준비시간 {recipe.prepTimeMinutes}분</p>
                  <p>조리시간 {recipe.cookTimeMinutes}분</p>
                </div>
              </div>
            </div>
            <div className="flex gap-[10px] items-start flex-wrap mt-6">
              {recipe.tags.slice(0, 3).map((tag, index) => (
                <div
                  key={index}
                  className="border border-[rgba(118,118,128,0.12)] border-solid box-border flex items-center justify-center px-[12px] py-[8px] rounded-[8px]"
                >
                  <span className="font-normal text-[14px] text-[rgba(27,31,38,0.72)]">
                    {tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ingredients */}
        <div className="bg-[#ebedf0] box-border flex flex-col items-start leading-relaxed p-[24px] rounded-[12px] text-black w-full">
          <h3 className="font-bold text-[28px] w-full">재료</h3>
          <p className="font-normal text-[16px] leading-relaxed w-full">
            {recipe.ingredients.join(", ")}
          </p>
        </div>

        {/* Recipe Instructions */}
        <div className="flex flex-col gap-[28px] items-start w-full">
          <h3 className="font-bold text-[28px] text-black w-full">레시피</h3>
          <div className="flex flex-col font-normal gap-[20px] items-start leading-relaxed text-[16px] text-black w-full">
            {recipe.instructions.map((instruction, index) => (
              <div key={index} className="flex w-full gap-3">
                <span className="font-semibold shrink-0">{index + 1}.</span>
                <span className="flex-1">{instruction}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recipe Info */}
        <div className="flex flex-col gap-[28px] items-start w-full">
          <h3 className="font-bold text-[28px] text-black w-full">요리 정보</h3>
          <div className="flex flex-col font-normal gap-[20px] items-start leading-relaxed text-[16px] text-black w-full">
            <p>
              <span className="font-semibold">유형:</span> {recipe.cuisine}
            </p>
            <p>
              <span className="font-semibold">음식특징:</span>{" "}
              {recipe.mealType.join(", ")}
            </p>
            <p>
              <span className="font-semibold">칼로리:</span>{" "}
              {recipe.caloriesPerServing}kcal
            </p>
            <p>
              <span className="font-semibold">별점:</span> {recipe.rating} ⭐
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
