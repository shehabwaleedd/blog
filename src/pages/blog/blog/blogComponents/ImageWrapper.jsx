import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ImageWrapper = ({
    filteredPosts,
    hoveredPostId,
    cursorPosition,
    imageSize,
    handleImageLoad,
    isImageVisible
    
}) => {
    return (
        <div className="menu__item-image_inner">
            <AnimatePresence>
                {isImageVisible && (
                    <motion.div>
                        {filteredPosts.map((image) => (
                            <div key={image.id}>
                                <div className={hoveredPostId === image.id ? "image-wrapper menu__item-image fade-in" : "menu__item-image"}
                                    key={image.id} style={hoveredPostId === image.id ? { transform: `translate(${cursorPosition.x - imageSize.width / 2}px, ${cursorPosition.y - imageSize.height / 2}px)`, } : {}}>
                                    {hoveredPostId === image.id && (
                                        <motion.img
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            src={image.imageUrls}
                                            alt={image.title}
                                            className="menu__item-image fade-in"
                                            onLoad={handleImageLoad}
                                        />
                                    )}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                )
                }
            </AnimatePresence>
        </div>
    )
}

export default ImageWrapper