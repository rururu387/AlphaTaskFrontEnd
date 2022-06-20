import { VisualMediaObject } from "./visual-media-object";

export class RecentRateMemeResponse
{
    private visualMediaObjects: VisualMediaObject[] = [];
    private recentRateDynamics: string = "";

    public getVisualMediaObjects(): VisualMediaObject[] {
        return this.visualMediaObjects;
    }
    public setVisualMediaObjects(value: VisualMediaObject[]) {
        this.visualMediaObjects = value;
    }
    public getRecentRateDynamics(): string {
        return this.recentRateDynamics;
    }
    public setRecentRateDynamics(value: string) {
        this.recentRateDynamics = value;
    }
}