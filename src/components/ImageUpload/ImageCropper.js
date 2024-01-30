import React, { useState, useRef } from 'react'
import ReactCrop, { centerCrop, makeAspectCrop } from 'react-image-crop'
import { canvasPreview } from './PixelPreview'
import { useDebounceEffect } from './useDebounceEfect'
import { CloseIcon } from '../../theme/svg-icons'
import Button from '../Button'
import 'react-image-crop/dist/ReactCrop.css'

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 90,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

export const ImageCropper = React.memo(({ onClose, getCroppedImage ,src }) => {
    const [imgSrc, setImgSrc] = useState( '')
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [scale] = useState(1)
    const [rotate] = useState(0)
    const [aspect] = useState(16 / 9)
    const [cropped, setcropped] = useState(false);
    const [outputUrl, setOutputUrl] = useState("")

    function onSelectFile(e) {
        if (e.target.files && e.target.files.length > 0) {
            setCrop(undefined) // Makes crop preview update between images.
            const reader = new FileReader()
            reader.addEventListener('load', () =>
                setImgSrc(reader.result?.toString() || ''),
            )
            reader.readAsDataURL(e.target.files[0])
        }
    }

    function onImageLoad(e) {
        if (aspect) {
            const { width, height } = e.currentTarget
            setCrop(centerAspectCrop(width, height, aspect))
        }
    }

    useDebounceEffect(
        async () => {
            if (
                completedCrop?.width &&
                completedCrop?.height &&
                imgRef.current &&
                previewCanvasRef.current
            ) {
                // We use canvasPreview as it's much faster than imgPreview.
                canvasPreview(
                    imgRef.current,
                    previewCanvasRef.current,
                    completedCrop,
                    scale,
                    rotate,
                )
            }
        },
        100,
        [completedCrop, scale, rotate],
    )

    const closeCropperScreen = () => {
        setcropped(false);
        setImgSrc("")
    }

    const handleCrop = () => {
        if (imgSrc) {
            if (!previewCanvasRef.current) {
                throw new Error('Crop canvas does not exist')
            }

            previewCanvasRef.current.toBlob((blob) => {
                if (!blob) {
                    throw new Error('Failed to create blob')
                }
                if (blobUrlRef.current) {
                    URL.revokeObjectURL(blobUrlRef.current)
                }
                blobUrlRef.current = URL.createObjectURL(blob)
                setOutputUrl(blobUrlRef.current)
                setcropped(true);
            })
        }

    }

    const handleBack = () => {
        setcropped(false);
        setImgSrc(imgSrc);
        setCompletedCrop(null);
    }

    const handleSubmit = () => {
        getCroppedImage(outputUrl)
    }

    return (
        <>
            <div >

                <div className="bg-white rounded-b-lg min-h-600">
                    {!imgSrc && <div className="relative my-5">
                        <input type="file" accept="image/*" onChange={onSelectFile} className='text-sm' />
                    </div>}
                    <div className='flex flex-col items-center justify-center'>
                        <div className={`w-full pb-5 ${cropped ? 'hidden' : 'opacity-100'}`}>
                            {imgSrc && <button className="relative flex ml-auto cursor-pointer" onClick={closeCropperScreen}>
                                <div className="pb-3">
                                    <CloseIcon />
                                </div>
                            </button>}
                            {imgSrc && <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={aspect}>
                                <img
                                    ref={imgRef}
                                    alt="Crop me"
                                    className='max-w-xs max-h-xs'
                                    src={imgSrc}
                                    style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>}
                        </div>
                        {!!completedCrop && imgSrc && (
                            <div className={`w-full my-3 flex justify-center mx-auto ${cropped ? 'opacity-100' : 'hidden'}`}>
                                <>
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            border: '1px solid black',
                                            objectFit: 'contain',
                                            width: completedCrop.width,
                                            height: completedCrop.height,
                                        }}
                                    />

                                </>
                            </div>
                        )}

                    </div>
                    {/* <div className="flex justify-between gap-4 sm:gap-5">
                      <Button
                        variant={"dark"}

                        label={"No, keep it"}
                        onClick={onClose}
                      />
                      {loading ? (
                        <PrimaryLoadingButton additionalButtonClasses="" />
                      ) : (
                        <Button
                          variant={"primary"}
                          className="flex-grow"
                          label={"Yes, delete"}
                          onClick={confirmDelete}
                        />
                      )}
                    </div> */}
                    <div  className="flex flex-wrap justify-between gap-4 sm:gap-5">
                        {!cropped ? <>

                            <Button variant={"dark"} disabled={false} type="button" onClick={onClose} label="Cancel" className="grow basis-0" />
                            <Button variant="primary" onClick={handleCrop} disabled={!imgSrc}  label={"Crop Image"} type="button" className="grow basis-0"/>
                        </>
                            :
                            <>
                                <Button variant="secondary" disabled={false} type="button" onClick={handleBack} label="Back"className="grow basis-0" />
                                <Button variant="primary" disabled={false} onClick={handleSubmit} type="button" label={false ? "Assigning..." : "Submit"} className="grow basis-0" />
                            </>
                        }


                    </div>
                </div>
            </div>
        </>
    )
})