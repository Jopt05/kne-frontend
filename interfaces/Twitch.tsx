export interface StreamInfo {
    title: Title;
}

export interface Title {
    broadcaster_id:                string;
    broadcaster_login:             string;
    broadcaster_name:              string;
    broadcaster_language:          string;
    game_id:                       string;
    game_name:                     string;
    title:                         string;
    delay:                         number;
    tags:                          string[];
    content_classification_labels: any[];
    is_branded_content:            boolean;
}
