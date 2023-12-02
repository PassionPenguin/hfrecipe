'use client';

import {useState} from "react";
import Link from "next/link";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faHeart as faHeartFilled} from "@fortawesome/free-solid-svg-icons";
import {faHeart} from "@fortawesome/free-regular-svg-icons";

export default function UserContentActions({userId, recipeId, currentLikeState, currentLikeCount}: {
    userId: string,
    recipeId: string,
    currentLikeState: any[],
    currentLikeCount: number
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
    }

    return (
        <div className="flex flex-col">
            <div onClick={toggleLike}
                 className="w-24 h-24 bg-slate-100 hover:bg-slate-200 dark:bg-slate-600 dark:hover:bg-slate-700 p-6 rounded-full cursor-pointer relative">
                <FontAwesomeIcon icon={like ? faHeartFilled : faHeart}
                                 className={"w-12 h-12 " + (like ? "text-red-600 dark:text-red-400" : "")}/>
                <div
                    className="badge rounded-full bg-slate-300 dark:bg-slate-800 w-8 h-8 text-center absolute right-0 top-0">{currentLikeState.length == 0 ? (currentLikeCount + (like ? 1 : 0)) : (currentLikeCount + (like ? 0 : -1))}</div>
            </div>
        </div>
    );
}