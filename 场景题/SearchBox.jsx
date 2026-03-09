
function SearchBox() {
    const [query, setQuery] = useState('');
    const [list, setList] = useState([]);

    const abortControllerRef = useRef(null);

    const debounceSearch = useCallback(debounce(async(val) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }
        const controller = new AbortController();
        abortControllerRef.current = controller;
        try {
            const result = await fetch(`/search?query=${val}`, {
                signal: controller.signal,
            });
            const res = await result.json();
            setList(res.data);
            abortControllerRef.current = null;
        } catch(e) {
            console.error(e);
        }
        

    }, 500), [])

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        debounceSearch(value);
    }
    return (
        <div>
            <input value={query} onChange={handleChange}></input>
            <ul>
                {list.map((i) => <li>{i}</li>)}
            </ul>
        </div>
    )
}

function debounce(fn, time) {
    let timer;

    return function(...args) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, time);
    }
}