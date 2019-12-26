import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
    const [value, setValue] = useState(1);
    const [visible, setVisible] = useState(true);
    return(
        <div>
            {
                visible&&(
                    <div>
                        <button onClick={() => setValue(value + 1)}>
                            +
                        </button>
                        <PlanetInfo id={value}/>
                    </div>
                )
            }
            <button onClick={() => setVisible((visible) => !visible)}>
                Toggle
            </button>
        </div>
    )
};

const PlanetInfo = ({id}) => {
    const [planetName, getName] = useState('')

    useEffect(() => {
       let cancelled = false;
       fetch(`https://swapi.co/api/planets/${id}`)
           .then(res => res.json())
           .then(data => !cancelled && getName(data.name));
       return () => cancelled = true;
   },[id]);

    return(
        <div>
            {id} - Planet  Name {planetName}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));