import { useEffect, useState } from 'react';
import Card from '../UI/Card/Card';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
const data = [
    {
        id: 'm1',
        name: 'Dal Bati',
        disc: 'A Rajasthani Traditional food',
        price: '25'
    },
    {
        id: 'm2',
        name: 'Litti Choka',
        disc: ' A Traditional food of Bihar',
        price: '15'
    },
    {
        id: 'm3',
        name: 'Makke di roti ',
        disc: 'A Traditional Punjabi food',
        price: '10'
    },
    {
        id: 'm4',
        name: 'Idali ans Dhosa',
        disc: 'A Traditional South indian food',
        price: '20'
    }

]


const AvailableMeals = () => {

    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchMeals = async () => {

            const response = await fetch('https://meals-17be2-default-rtdb.firebaseio.com/meals.json');

            if (!response.ok) {
                throw new Error("Something went wrong");
            }

            const responseData = await response.json();

            console.log(responseData);
            const loadedMeals = [];
            for (const key in responseData) {
                loadedMeals.push({
                    id: key,
                    name: responseData[key].name,
                    disc: responseData[key].disc,
                    price: responseData[key].price
                });
            }
            console.log(loadedMeals);
            setMeals(loadedMeals);

        };
        fetchMeals().catch(error => {
            setIsLoading(false);
            setError(error.message);

        });
        setIsLoading(false);

    }, []);

    if (isLoading) {
        return <section className={styles.loading}>
            <p>Loading...</p>
        </section>
    }
    if (error) {
        return <section className={styles.loading}>
            <p>{error}</p>
        </section>
    }

    const mealList = meals.map((meal) => <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        disc={meal.disc}
        price={meal.price}
    />);
    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section>
    );
}

export default AvailableMeals;