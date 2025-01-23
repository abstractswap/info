import { useEffect, useRef } from 'react';

export function useOnClickOutside(node, handler, ignoredNodes = []) {
    const handlerRef = useRef(handler);

    useEffect(() => {
        handlerRef.current = handler;
    }, [handler]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            const nodeClicked = node.current?.contains(e.target);
            const ignoredNodeClicked = ignoredNodes.reduce(
                (reducer, val) => reducer || !!val.current?.contains(e.target),
                false
            );

            if ((nodeClicked || ignoredNodeClicked) ?? false) {
                return;
            }

            if (handlerRef.current) handlerRef.current();
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [node, ignoredNodes]);
}
