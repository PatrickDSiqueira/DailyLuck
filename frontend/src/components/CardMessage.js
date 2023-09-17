import {Card} from "primereact/card";
import {TabPanel, TabView} from "primereact/tabview";

export default function CardMessage({messagePt, messageEn}) {

    return <div className="card">
        <Card className="md:w-25rem">
            <TabView>
                <TabPanel header="Português">
                    <p className="m-0">{messagePt}</p>
                </TabPanel>
                {messageEn && <TabPanel header="English">
                    <p className="m-0">{messageEn}</p>
                </TabPanel>}
            </TabView>
        </Card>
    </div>
}