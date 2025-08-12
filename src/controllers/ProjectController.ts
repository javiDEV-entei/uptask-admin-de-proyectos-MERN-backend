import type { Request, Response } from "express";
import Project from "../models/Project";


export class ProjectController {

    static creeateProyect = async (req: Request, res: Response) =>{
        
        const project = new Project(req.body)

        
        try {
           await project.save()
           res.send('proyecto creado correctamente')
        
        } catch (error) {
            console.log(error);
            
            
        }
    }

    static getAllProyects = async (req: Request, res: Response) =>{
        
        res.send('Todos los proyectos')
        
    }
}