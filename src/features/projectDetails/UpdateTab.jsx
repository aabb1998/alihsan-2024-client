import React, { useState } from "react";
import Img from "../../components/Image";
import { nl2br } from "../../utils/helper";
import ShareModal from "./ShareModal";

export const UpdateTab = ({ posts, slug, title }) => {
  const [sharing, setSharing] = useState(false);
  return (
    <div className="flex flex-col gap-10 mb-10">
      {posts?.map((post) => (
        <div className="flex flex-col gap-5 p-5 border rounded-4xl border-neutral-300">
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div>
                    <img
                      className="rounded-full w-9 h-9 md:w-11 md:h-11"
                      src={
                        post?.User?.profileImage ||
                        "/images/avatar/avatar-1.jpg"
                      }
                      alt="post-image"
                    />
                  </div>
                  <div>
                    <div className="text-button-md md:text-heading-7 line-clamp-1">
                      {post?.User?.firstName + " "}
                      {post?.User?.lastName}
                    </div>
                    <div className="text-xs md:text-sm text-neutral-500">
                      {post?.displayTime}
                    </div>
                  </div>
                </div>
                <div>
                  <span
                    onClick={() => setSharing(true)}
                    className="btn-responsive btn-outline-secondary"
                  >
                    Share
                  </span>
                </div>
              </div>
            </div>
            <div>
              <p
                className="text-sm text-neutral-800"
                dangerouslySetInnerHTML={nl2br(post?.text)}
              ></p>
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {post?.PostMedia?.map((media) => (
                <div className="col-span-3 sm:col-span-1">
                  <div className="overflow-hidden rounded-1.5xl">
                    <Img
                      src={media?.url}
                      height="200"
                      className="object-cover w-full h-45"
                      alt=""
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
      <ShareModal
        slug={slug}
        title={title}
        visible={sharing}
        onClose={() => setSharing(false)}
      />
    </div>
  );
};
