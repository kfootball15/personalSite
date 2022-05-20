import React, { useEffect, useRef, useCallback } from 'react';
import { makeStyles } from '@material-ui/core';
import p5 from 'p5';
import { Vector as p5Vector } from 'p5';
import {
    useWindowSize,
} from 'helpers';

/** Using p5 with react: 
 * https://dev.to/christiankastner/integrating-p5-js-with-react-i0d
 * https://github.dev/christiankastner/React-P5-Template/blob/master/src/App.js */
export default function FlockDoodle ({
    isTransitioning,
    isActive,
    isMobile
}) {
    const classes = useStyles();
    const windowSize = useWindowSize();

    //p5 instance mode requires a reference on the DOM to mount the sketch
    //So we use react's createRef function to give p5 a reference
    const sketchRef = useRef(null);
    // const imageBGRef = useRef(null);

    // This uses p5's instance mode for sketch creation and namespacing
    /**
     * This Ripple alogrithm references this old web page: 
     * https://web.archive.org/web/20160418004149/http://freespace.virgin.net/hugo.elias/graphics/x_water.htm
     * 
     * Original Coding train tut:
     * https://www.youtube.com/watch?v=BZUdGqeOD0w&ab_channel=TheCodingTrain 
     */
    const Sketch = useCallback( p5 => {

        let numBirds = 50;
        let flock = []
        
        class Boid {

            constructor () {
                this.position = p5.createVector( p5.random(p5.width), p5.random(p5.height) );
                this.velocity = p5Vector.random2D(); //randomizes the vector direction of each Boid
                this.velocity.setMag(p5.random(2, 4)); //randomized the velocity
                this.acceleration = p5.createVector();
                this.maxForce = 1;
                this.maxSpeed = 4;
            }

            /**
             * Edges:
             * If a boid goes off the screen, it will reappear on the opposite side of the screen
             */
            edges () {
                if (this.position.x > p5.width) {
                    this.position.x = 0;
                } else if (this.position.x < 0) {
                    this.position.x = p5.width;
                }
                
                if (this.position.y > p5.height) {
                    this.position.y = 0;
                } else if (this.position.y < 0) {
                    this.position.y = p5.height;
                }
            }

            /**
             * Align:
             * Finds the other boids in the flock that are within the neighborRadius 
             * and returns a steeringVelocity vector that is the average force and direction of the flock
             * 
             * If more than one bird is found, we divide the steering force by the total number of birds found and 
             * subtract the current bird's velocity from the steeringVelocity to get the correct vector value
             */
            align (boids) {
                let neighborRadius = 50;
                let steeringVelocity = p5.createVector(); //The steering force is the force that pushes the vector of the current direction towards the average direction of the flock
                let total = 0;

                for (let other of boids) {
                    let d = p5.dist(
                        this.position.x,
                        this.position.y,
                        other.position.x,
                        other.position.y
                    )
                    if (other != this && d < neighborRadius) { //If it finds other birds within the perception radius, it adds their direction to the steering force
                        steeringVelocity.add(other.velocity);
                        total++;
                    }
                }

                if (total > 0) {
                    steeringVelocity.div(total); //divide by total to get average
                    steeringVelocity.setMag(this.maxSpeed);
                    steeringVelocity.sub(this.velocity); //subtract current velocity to get desired velocity
                    steeringVelocity.limit(this.maxForce); //limit the force to the max force - the velocity of each boid will be limited
                }

                return steeringVelocity; // returns a vector with x/y values between 0 and the boids maxForce
            }

            separation (boids) {
                let perceptionRadius = 50;
                let steering = p5.createVector();
                let total = 0;
                for (let other of boids) {
                    let d = p5.dist(
                        this.position.x,
                        this.position.y,
                        other.position.x,
                        other.position.y
                    );
                    if (other != this && d < perceptionRadius) {
                        let diff = p5Vector.sub(this.position, other.position);
                        diff.div(d * d);
                        steering.add(diff);
                        total++;
                    }
                }
                if (total > 0) {
                    steering.div(total);
                    steering.setMag(this.maxSpeed);
                    steering.sub(this.velocity);
                    steering.limit(this.maxForce);
                }
                return steering;
            }
            
            /**
             * Cohesion:
             * Finds the average position of local flockmates and steers the current boid towards that position
             * 
             * If more than one bird is found, we divide the steering force by the total number of birds found and 
             * subtract the current bird's velocity from the steeringDirection to get the correct vector value
             */
            cohesion (boids) {
                let neighborRadius = 100;
                let steeringDirection = p5.createVector(); //The steering force is the force that pushes the vector of the current direction towards the average direction of the flock
                let total = 0;

                for (let other of boids) {
                    let d = p5.dist(
                        this.position.x,
                        this.position.y,
                        other.position.x,
                        other.position.y
                    )
                    
                    if (other != this && d < neighborRadius) { //If it finds other birds within the perception radius, it adds their direction to the steering force
                        steeringDirection.add(other.position);
                        total++;
                    }
                }

                if (total > 0) {
                    steeringDirection.div(total); //divide by total to get average
                    steeringDirection.sub(this.position); //subtract current position from average to get a vector that points the current bird toward the average of its flockmates
                    steeringDirection.setMag(this.maxSpeed);
                    steeringDirection.sub(this.velocity);
                    steeringDirection.limit(this.maxForce); //limit the force to the max force - the velocity of each boid will be limited
                }
                
                return steeringDirection; // returns a vector with x/y values between 0 and the boids maxForce
            }

            /**
             * Flock:
             * this method takes the steeringVelocity vector returnned by this.align and
             * ......
             */
            flock (boids) {
                let alignment = this.align(boids);
                let cohesion = this.cohesion(boids);
                // let separation = this.separation(boids);
            
                // alignment.mult(alignSlider.value());
                // cohesion.mult(cohesionSlider.value());
                // separation.mult(separationSlider.value());
            
                this.acceleration.add(alignment);
                this.acceleration.add(cohesion);
                // this.acceleration.add(separation);

                // let separation = this.separation(boids);
                // alignment.mult(1);
                // cohesion.mult(1);
                // separation.mult(1);
                // this.acceleration.add(alignment);
            }

            update () {
                this.position.add(this.velocity);
                this.velocity.add(this.acceleration);
                this.velocity.limit(this.maxSpeed);
                this.acceleration.mult(0);
            }

            show () {
                p5.strokeWeight(16)
                p5.stroke(255)
                p5.point(this.position.x, this.position.y)
            }
        }

       
        p5.setup = () => {
            p5.createCanvas(windowSize.width, windowSize.height);

            //Boid video
            for (let i = 0; i < numBirds; i++) {
                let newBoid = new Boid();
                flock.push(newBoid);
            }

        }

        p5.draw = () => {
            p5.background(237, 34, 93);

            for(let boid of flock) {
                boid.edges();
                boid.flock(flock)
                boid.show();
                boid.update();
            }

        }
        

    }, [windowSize])

    /** Create a new p5 object on component mount, feed it */
    useEffect(() => {
        let myP5;
        if (isActive) myP5 = new p5(Sketch, sketchRef.current)
    }, [isActive])

    return (
        <div className={classes.container} >
            {/* Rain Drop Sktch */}
            <div
                className={ classes.sketch }
                ref={ sketchRef } 
            />
        </div>
    )
};

const useStyles = makeStyles( theme => ({
    container: {

    },
    img: {

    },
    sketch: {

    }
}));