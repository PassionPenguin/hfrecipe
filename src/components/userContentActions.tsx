"use client";

import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as faHeartFilled } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function UserContentActions({
    userId,
    recipeId,
    currentLikeState,
    currentLikeCount
}: {
    userId: string;
    recipeId: string;
    currentLikeState: any[];
    currentLikeCount: number;
}) {
    const [like, setLike] = useState(currentLikeState.length != 0);

    const toggleLike = () => {
        setLike(!like);
        fetch("/api/recipe/like", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userId: userId,
                recipeId: recipeId
            })
        }).then((response) => {
            if (response.ok) {
                response.json().then((data) => {
                    if (data.like != undefined) setLike(data.like);
                    else {
                        // failed to toggle state
                    }
                });
            }
        });
    };

    return (
        <div className="flex flex-col">
            <div
                onClick={toggleLike}
                className="relative h-24 w-24 cursor-pointer rounded-full bg-slate-100 p-6 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700"
            >
                <FontAwesomeIcon
                    icon={like ? faHeartFilled : faHeart}
                    className={
                        "h-12 w-12 " +
                        (like ? "text-red-600 dark:text-red-400" : "")
                    }
                />
                <div className="badge absolute right-0 top-0 h-8 w-8 rounded-full bg-slate-300 text-center dark:bg-slate-800">
                    {currentLikeState.length == 0
                        ? currentLikeCount + (like ? 1 : 0)
                        : currentLikeCount + (like ? 0 : -1)}
                </div>
            </div>
        </div>
    );
}
