export default (ref, className) => {
    return () => {
        let element = ref.current;
        if (element.classList.contains(className)) {
            element.classList.remove(className);
            void element.offsetWidth;
        }
        element.classList.add(className);
    }
};