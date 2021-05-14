export const setBodyOverflow = (isActive?: boolean) => {
    if (isActive) {
        document.body.style.overflow = "hidden";
        document.body.style.height = "100vh";
    } else {
        document.body.style.overflow = "unset";
        document.body.style.height = "0";
    }
};
